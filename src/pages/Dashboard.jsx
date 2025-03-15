// src/pages/Dashboard.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const planOptions = [
  "Individual Accommodation Plan (IAP)",
  "504 Plan",
  "English Language Learner (ELL) Plan",
  "General IEP",
  "Other",
];

export default function Dashboard() {
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <div className="flex h-screen font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8 overflow-auto grid md:grid-cols-2 gap-8">
          {/* New Student Support Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">New Student Support</h2>
            <p className="text-gray-600 mb-3">What type of plan is this?</p>
            <ul className="space-y-2">
              {planOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => setSelectedPlan(option)}
                  className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedPlan === option
                      ? "bg-gradient-to-r from-pink-500 to-orange-500"
                      : "hover:bg-gradient-to-r hover:from-pink-500/50 hover:to-orange-500/50"
                  }`}
                >
                  {/* Custom radio circle */}
                  <div className="w-4 h-4 mr-3 rounded-full border border-gray-500 flex items-center justify-center">
                    {selectedPlan === option && (
                      <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                    )}
                  </div>
                  <span
                    className={`${selectedPlan === option ? "text-white" : "text-black"} whitespace-nowrap`}
                  >
                    {option}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  if (selectedPlan === "General IEP") {
                    window.location.href = "/new-student/info";
                  }
                }}
                className={`w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center transition-all duration-300 ${
                  selectedPlan === "General IEP"
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
                title="Create IEP"
              >
                <span className="text-xl font-bold text-white">+</span>
              </button>
            </div>
          </div>
          {/* Today's Agenda Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800">Today's Agenda</h2>
            <p className="text-gray-600 mt-2">Nothing Yet!</p>
            <div className="flex justify-end mt-auto">
              <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full hover:scale-105 transition-all duration-300">
                Edit Agenda
              </button>
            </div>
          </div>
          {/* Data Dashboard Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:col-span-2">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Data Dashboard</h2>
            <p className="text-gray-600">No data gathered</p>
          </div>
        </main>
      </div>
    </div>
  );
}
