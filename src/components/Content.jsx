import React, { useState, useEffect } from "react";
import { AlertTriangle, Eye, EyeOff, Copy, Edit } from "lucide-react";
import CryptoJS from "crypto-js";

const Content = ({ selectedItem, credentials, onUpdate }) => {
  const [isReused, setIsReused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordBreached, setisPasswordBreached] = useState(false);
  const createdAt = credentials.createdAt
    ? new Date(credentials.createdAt.seconds * 1000).toLocaleString()
    : "N/A";

  useEffect(() => {
    if (!selectedItem) return;
    const checkPassword = async () => {
      const sha1Hash = CryptoJS.SHA1(selectedItem.password)
        .toString(CryptoJS.enc.Hex)
        .toUpperCase();
      const first5 = sha1Hash.slice(0, 5);
      const tail = sha1Hash.slice(5);
      try {
        const response = await fetch(
          `https://api.pwnedpasswords.com/range/${first5}`
        );
        const data = await response.text();

        const found = data
          .split("\n")
          .some((line) => line.split(":")[0] === tail);
        setisPasswordBreached(found);
      } catch (error) {
        setisPasswordBreached(false);
      }
    };
    checkPassword();
  }, [selectedItem, setisPasswordBreached]);
  useEffect(() => {
    if (selectedItem) {
      setPassword(selectedItem.password);
      const reused = credentials.some(
        (cred) =>
          cred.password === selectedItem.password &&
          cred.website !== selectedItem.website
      );
      setIsReused(reused);
    }
  }, [selectedItem, credentials]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save updated password
      onUpdate(selectedItem.website, password);
    }
    setIsEditing(!isEditing);
  };

  if (!selectedItem) {
    return (
      <p className="text-gray-500 p-4 flex justify-center items-center mx-auto my-auto">
        Select an item to view details.
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full p-6 bg-white">
        {/* Header Section */}
        <div className="flex items-center mb-4">
          <img
            src={
              selectedItem?.websiteURL
                ? `https://www.google.com/s2/favicons?sz=128&domain=${
                    new URL(
                      selectedItem.websiteURL.startsWith("http")
                        ? selectedItem.websiteURL
                        : `https://${selectedItem.websiteURL}`
                    ).hostname
                  }`
                : "/default-favicon.png"
            }
            alt="favicon"
            className="w-14 h-14 rounded-md mr-3"
          />

          <div>
            <h2 className="text-2xl font-semibold">
              {selectedItem.websiteName}
            </h2>
            <p className="text-sm text-gray-500">Last modified {createdAt}</p>
          </div>
        </div>

        {/* Credential Fields */}
        <div className="border-t border-gray-300 pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Username</span>
            <span className="text-gray-800">{selectedItem.userName}</span>
          </div>

          {/* Password Section */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Password</span>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border rounded-md text-black w-40"
                />
              ) : (
                <span className="text-gray-800">
                  {showPassword ? password : "••••••••••••••"}
                </span>
              )}
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <button onClick={handleCopy}>
                <Copy size={20} />
              </button>
              <button onClick={handleEdit}>
                <Edit size={20} className={isEditing ? "text-blue-500" : ""} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Website</span>
            <a
              href={
                selectedItem?.websiteURL.startsWith("http")
                  ? selectedItem.websiteURL
                  : `https://${selectedItem.websiteURL}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {selectedItem?.websiteURL} and 1 more
            </a>
          </div>
        </div>

        {/* Security Section */}
        {isReused && (
          <div className="mt-6 p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertTriangle className="text-yellow-500 mr-2" size={22} />
              <span className="text-yellow-700 font-semibold">
                Reused Password
              </span>
            </div>
            <p className="text-gray-700 text-sm">
              This password is the same as another password you’ve saved and
              should be changed.
            </p>
            <button className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Change Password By Clicking on Edit Option Beside Password.
            </button>
          </div>
        )}
        {isPasswordBreached && (
          <div className="mt-6 p-4 border border-red-300 bg-red-50 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertTriangle className="text-red-500 mr-2" size={22} />
              <span className="text-red-700 font-semibold">
                Password Breached
              </span>
            </div>
            <p className="text-gray-700 text-sm">
              This password is the found in a breach, its better to change.
            </p>
            <button className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Change Password By Clicking on Edit Option Beside Password.
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
