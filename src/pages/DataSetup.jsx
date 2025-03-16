import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import { IEPContext } from "../context/IEPContext";

export default function DataSetup() {
  const navigate = useNavigate();
  const { finalizeReport } = useContext(IEPContext);

  const overallProgress = 60; // Steps 1–3 complete

  return (
    <div className="flex h-screen font-sans bg-offwhite">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="mt-4 mb-4 max-w-3xl mx-auto">
          <ProgressBar progress={overallProgress} />
          <p className="text-sm text-gray-600 mt-1 text-center">
            Overall Progress: {overallProgress}%
          </p>
        </div>
        <div className="pt-8 p-8 overflow-auto flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Student Data Dashboard
          </h2>
          <p className="text-xs text-gray-500 mb-4 text-center max-w-md">
            Choose an option below to add a new goal or enter existing data.
          </p>
          <div className="w-full max-w-3xl grid md:grid-cols-2 gap-8 mb-8">
            <div
              onClick={() => navigate("/new-student/add-goal")}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Add Goal</h3>
              <p className="text-gray-600 text-sm">Set up a new goal.</p>
            </div>
            <div
              onClick={() => navigate("/new-student/add-data")}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Add Data</h3>
              <p className="text-gray-600 text-sm">Upload or enter existing data.</p>
            </div>
          </div>
          <div className="flex justify-between w-full max-w-3xl">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-300 rounded-full text-gray-800 hover:scale-105 transition-all duration-300"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                finalizeReport();
                navigate("/iep-report");
              }}
              className="px-6 py-2 bg-gradient-to-r from-pastelPink to-pastelOrange text-white rounded-full hover:scale-105 transition-all duration-300"
            >
              Save & Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
