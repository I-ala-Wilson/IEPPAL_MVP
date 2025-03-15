// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiSearch } from "react-icons/fi";
import profilePlaceholder from "../assets/icons/profile-placeholder.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-lg rounded-b-2xl py-3 px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex flex-1 items-center mx-4 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
        <FiSearch className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search IEPPAL"
          className="ml-3 flex-1 bg-transparent placeholder-gray-500 focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-6">
        <button
          className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300"
          title="Notifications"
        >
          <FiBell className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={() => {
            // Account menu action
          }}
          className="w-10 h-10 rounded-full overflow-hidden"
          title="Profile"
        >
          <img src={profilePlaceholder} alt="Profile" className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
}
