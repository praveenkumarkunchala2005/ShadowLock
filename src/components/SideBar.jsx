import React, { useState } from "react";
import { Search, AlertCircle } from "lucide-react";

const SideBar = ({ setSelectedItem,credentials }) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredCredentials = credentials.filter(
    (item) =>
      item.websiteName.toLowerCase().includes(search.toLowerCase()) ||
      item.userName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="w-full h-screen bg-white text-black p-4">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 pl-10 rounded-md bg-gray-100 text-black border border-gray-300 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-2 text-gray-500" size={18} />
      </div>

      <ul className="space-y-2 overflow-y-auto max-h-[80vh]">
        {filteredCredentials.map((item, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition border-b border-gray-300 ${
              selectedIndex === index
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => {
              setSelectedIndex(index);
              setSelectedItem(item);
            }}
          >
            <div className="flex items-center space-x-3">
              <img
                src={
                  item?.websiteURL
                  ? `https://www.google.com/s2/favicons?sz=128&domain=${
                      new URL(
                        item.websiteURL.startsWith("http")
                          ? item.websiteURL
                          : `https://${item.websiteURL}`
                      ).hostname
                    }`
                  : "/default-favicon.png"
                }
                alt={item.websiteName}
                className="w-8 h-8 rounded-md"
              />
              <div>
                <p className="font-semibold">{item.websiteName}</p>
                <p className="opacity-80 text-sm truncate w-40">
                  {item.userName}
                </p>
              </div>
            </div>
{/* 
            <AlertCircle
              className={`size-5 ${
                selectedIndex === index ? "text-white" : "text-gray-400"
              }`}
            /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
