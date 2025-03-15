import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function StrategyLibrary() {
  return (
    <div className="flex h-screen font-sans bg-offwhite">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8 overflow-auto">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Strategy Library</h1>
          <p className="text-gray-700">This section will list various instructional strategies to support student learning. (Coming Soon!)</p>
        </div>
      </div>
    </div>
  );
}
