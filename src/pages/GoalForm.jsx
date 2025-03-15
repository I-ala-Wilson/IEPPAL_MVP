import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import { IEPContext } from "../context/IEPContext";

export default function GoalForm() {
  const navigate = useNavigate();
  const { updateGoal, finalizeReport } = useContext(IEPContext);

  const [goalOverview, setGoalOverview] = useState("");
  const [alignedStandard, setAlignedStandard] = useState([]);
  const [recommendedStrategies, setRecommendedStrategies] = useState([]);
  const [goalMeasurement, setGoalMeasurement] = useState("");

  const standards = [
    "Class A Standard 1",
    "Class A Standard 2",
    "Class A Standard 3",
    "Class B Standard 1",
    "Class B Standard 2",
    "Class B Standard 3"
  ];
  const strategies = [
    "Multi-sensory Instruction",
    "Small Group Instruction",
    "Visual Learning Aids",
    "One-on-One Tutoring",
    "Peer Assisted Learning",
    "Interactive Whiteboard",
    "Digital Tools",
    "Behavioral Intervention",
    "Routine and Structure",
    "Regular Feedback"
  ];

  // Compute fraction for GoalForm (4 fields)
  let completed = 0;
  if (goalOverview.trim()) completed++;
  if (alignedStandard.length) completed++;
  if (recommendedStrategies.length) completed++;
  if (goalMeasurement) completed++;
  const fraction = completed / 4;
  // Overall progress for GoalForm = 80 + fraction * 20
  const overallProgress = Math.round(80 + fraction * 20);

  const handleStrategyChange = (e) => {
    const value = e.target.value;
    setRecommendedStrategies((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleGoalMeasurementChange = (e) => {
    setGoalMeasurement(e.target.value);
  };

  const handleDone = (e) => {
    e.preventDefault();
    updateGoal({
      goalOverview: goalOverview || "N/A",
      alignedStandard: alignedStandard.length ? alignedStandard : [],
      recommendedStrategies: recommendedStrategies.length ? recommendedStrategies : [],
      goalMeasurement: goalMeasurement || "N/A"
    });
    finalizeReport();
    navigate("/iep-report");
  };

  return (
    <div className="flex h-screen font-sans bg-offwhite">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        {/* Continuous Progress Bar */}
        <div className="p-4 max-w-3xl mx-auto">
          <ProgressBar progress={overallProgress} />
          <p className="text-sm text-gray-600 mt-1">Overall Progress: {overallProgress}%</p>
        </div>
        <div className="p-8 overflow-auto">
          <form onSubmit={handleDone} className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Let’s Create Student’s First Goal
            </h2>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">Goal Overview</label>
              <textarea
                value={goalOverview}
                onChange={(e) => setGoalOverview(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                rows="3"
                placeholder="Describe the goal following the SMART framework..."
              ></textarea>
              <p className="text-xs italic text-gray-500 mt-1">
                When creating a goal, make sure it follows the SMART Framework.
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">Aligned Standards</label>
              <select
                multiple
                value={alignedStandard}
                onChange={(e) =>
                  setAlignedStandard(Array.from(e.target.selectedOptions, option => option.value))
                }
                className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                {standards.map((standard) => (
                  <option key={standard} value={standard}>
                    {standard}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">Recommended Strategies</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {strategies.map((strategy) => (
                  <label key={strategy} className="flex items-center space-x-2 border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:bg-pink-100 transition-colors">
                    <input
                      type="checkbox"
                      value={strategy}
                      checked={recommendedStrategies.includes(strategy)}
                      onChange={handleStrategyChange}
                      className="form-checkbox"
                    />
                    <span className="text-gray-700">{strategy}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700">Goal Measurement</label>
              <select
                value={goalMeasurement}
                onChange={handleGoalMeasurementChange}
                className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option value="">Select Measurement Type</option>
                <option value="Percentage">Percentage (%)</option>
                <option value="Frequency">Frequency</option>
              </select>
              <p className="text-xs italic text-gray-500 mt-1">
                Select a measurable way to track progress toward the goal.
              </p>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-300 rounded-full text-gray-800 hover:scale-105 transition-all duration-300"
              >
                Back
              </button>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    updateGoal({
                      goalOverview: "N/A",
                      alignedStandard: [],
                      recommendedStrategies: [],
                      goalMeasurement: "N/A"
                    });
                    finalizeReport();
                    navigate("/iep-report");
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-full hover:scale-105 transition-all duration-300"
                >
                  Skip Goal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-pastelPink to-pastelOrange text-white rounded-full hover:scale-105 transition-all duration-300"
                >
                  Done
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
