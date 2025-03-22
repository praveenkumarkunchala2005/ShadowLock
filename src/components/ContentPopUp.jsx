import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Eye, EyeOff, Copy, Edit } from "lucide-react";
import CryptoJS from "crypto-js";
const ContentPopUp = ({ selectedItem, credentials, onClose }) => {
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
          cred.websiteName !== selectedItem.websiteName
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
      onUpdate(selectedItem.website, password);
    }
    setIsEditing(!isEditing);
  };

  if (!selectedItem) {
    return <p className="text-gray-500 p-4">Select an item to view details.</p>;
  }
  return (
    <Dialog defaultOpen={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 border-b pb-3">
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
            className="w-12 h-12 rounded-md mr-3"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {selectedItem.websiteName}
            </h2>
            <p className="text-sm text-gray-500">Last modified {createdAt}</p>
          </div>
        </div>
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Username</span>
            <div className="relative w-2/3">
              <div
                className="max-w-[220px] overflow-x-auto whitespace-nowrap cursor-pointer border-b border-dashed border-gray-400 text-right ml-auto"
                title={selectedItem.email}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {selectedItem.userName}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Password</span>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-1 border rounded-md text-black w-32"
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
                <Copy size={20} className="text-blue-500" />
              </button>
              <button onClick={handleEdit}>
                <Edit size={20} className={isEditing ? "text-blue-500" : ""} />
              </button>
            </div>
          </div>

          {/* Website Section */}
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Website</span>
            <a
              href={`https://${selectedItem.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {selectedItem.website}
            </a>
          </div>
        </div>

        {/* Security Warning */}
        {isReused && (
          <div className="mt-4 p-3 border border-yellow-300 bg-yellow-50 rounded-lg flex items-center">
            <AlertTriangle className="text-yellow-500 mr-2" size={22} />
            <div>
              <p className="text-yellow-700 font-semibold">Reused Password</p>
              <p className="text-gray-700 text-sm">
                This password is the same as another one you’ve saved and should
                be changed.
              </p>
              <button className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Change Password By Clicking on Edit Option Beside Password..
              </button>
            </div>
          </div>
        )}
        {isPasswordBreached && (
          <div className="mt-4 p-3 border border-red-300 bg-red-50 rounded-lg flex items-center">
            <AlertTriangle className="text-red-500 mr-2" size={22} />
            <div>
              <p className="text-red-700 font-semibold">Password Breached</p>
              <p className="text-gray-700 text-sm">
                This password is the found in a breach, its better to be
                changed.
              </p>
              <button className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Change Password By Clicking on Edit Option Beside Password..
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContentPopUp;
