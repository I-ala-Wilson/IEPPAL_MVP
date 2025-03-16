import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import { IEPContext } from "../context/IEPContext";

export default function GoalForm() {
  const navigate = useNavigate();
  const { goal, updateGoal, finalizeReport } = useContext(IEPContext);

  const [goalOverview, setGoalOverview] = useState(goal?.goalOverview || "");
  const [alignedStandard, setAlignedStandard] = useState(goal?.alignedStandard || []);
  const [recommendedStrategies, setRecommendedStrategies] = useState(goal?.recommendedStrategies || []);
  const [goalMeasurement, setGoalMeasurement] = useState(goal?.goalMeasurement || "");

  useEffect(() => { setGoalOverview(goal?.goalOverview || ""); }, [goal?.goalOverview]);
  useEffect(() => { setAlignedStandard(goal?.alignedStandard || []); }, [goal?.alignedStandard]);
  useEffect(() => { setRecommendedStrategies(goal?.recommendedStrategies || []); }, [goal?.recommendedStrategies]);
  useEffect(() => { setGoalMeasurement(goal?.goalMeasurement || ""); }, [goal?.goalMeasurement]);

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

  let completed = 0;
  if (goalOverview.trim()) completed++;
  if (alignedStandard.length) completed++;
  if (recommendedStrategies.length) completed++;
  if (goalMeasurement) completed++;
  const fraction = completed / 4;
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
        <div className="mt-4 mb-4 max-w-3xl mx-auto">
          <ProgressBar progress={overallProgress} />
          <p className="text-sm text-gray-600 mt-1 text-center">
            Overall Progress: {overallProgress}%
          </p>
        </div>
        <div className="pt-8 p-8 overflow-auto">
          <form onSubmit={handleDone} className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Let’s Create Student’s First Goal
            </h2>
            
            {/* Goal Overview */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">
                Goal Overview
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Provide a clear, measurable, and time-bound description of the goal using SMART criteria.
              </p>
              <textarea
                value={goalOverview}
                onChange={(e) => setGoalOverview(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                rows="3"
                placeholder="e.g. Improve reading comprehension by 20% by the end of the semester..."
              ></textarea>
            </div>
            
            {/* Aligned Standards */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">
                Aligned Standards
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Select the academic standards this goal addresses. (Hold Ctrl/Cmd to select multiple.)
              </p>
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
            
            {/* Recommended Strategies */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700">
                Recommended Strategies
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Choose one or more strategies that you plan to implement to support this goal.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                {strategies.map((strategy) => (
                  <label
                    key={strategy}
                    className="flex items-center space-x-2 border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:bg-pink-100 transition-colors"
                  >
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
            
            {/* Goal Measurement */}
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700">
                Goal Measurement
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Select the type of measurement (e.g. percentage or frequency) to gauge progress.
              </p>
              <select
                value={goalMeasurement}
                onChange={handleGoalMeasurementChange}
                className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option value="">Select Measurement Type</option>
                <option value="Percentage">Percentage (%)</option>
                <option value="Frequency">Frequency</option>
              </select>
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
                  className="px-6 py-2 bg-gradient-to-r from-pastelPink to-pastelOrange text-white rounded-full hover:scale-105 transition-all duration-500"
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
