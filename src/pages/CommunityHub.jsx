import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function CommunityHub() {
  return (
    <div className="flex h-screen font-sans bg-offwhite">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8 overflow-auto">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Community Hub</h1>
          <p className="text-gray-700">Connect with other educators, share resources, and discuss best practices here. (Coming Soon!)</p>
        </div>
      </div>
    </div>
  );
}
