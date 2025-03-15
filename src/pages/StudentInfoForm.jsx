import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import { IEPContext } from "../context/IEPContext";

export default function StudentInformationForm() {
  const navigate = useNavigate();
  const { updateStudentInfo } = useContext(IEPContext);
  
  const [studentName, setStudentName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [dob, setDob] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [grade, setGrade] = useState("");
  const [classroom, setClassroom] = useState("");
  const [studentId, setStudentId] = useState("");
  const [language, setLanguage] = useState("");
  
  const totalFields = 8;
  let completedFields = 0;
  if (studentName.trim()) completedFields++;
  if (preferredName.trim()) completedFields++;
  if (dob.trim()) completedFields++;
  if (entryDate.trim()) completedFields++;
  if (grade.trim()) completedFields++;
  if (classroom.trim()) completedFields++;
  if (studentId.trim()) completedFields++;
  if (language.trim()) completedFields++;
  
  const fraction = completedFields / totalFields;
  const overallProgress = Math.round(fraction * 20);
  
  const handleNext = (e) => {
    e.preventDefault();
    updateStudentInfo({
      studentName: studentName || "N/A",
      preferredName: preferredName || "N/A",
      dob: dob || "N/A",
      entryDate: entryDate || "N/A",
      grade: grade || "N/A",
      classroom: classroom || "N/A",
      studentId: studentId || "N/A",
      language: language || "N/A",
    });
    navigate("/new-student/needs");
  };
  
  return (
    <div className="flex h-screen font-sans bg-offwhite">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        {/* Progress Bar for Step 1 */}
        <div className="p-4 max-w-3xl mx-auto">
          <ProgressBar progress={overallProgress} />
          <p className="text-sm text-gray-600 mt-1">Overall Progress: {overallProgress}%</p>
        </div>
        <div className="p-8 overflow-auto">
          <form onSubmit={handleNext} className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Student Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700">Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">DOB (DDMMYYYY)</label>
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Enter date of birth"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Grade Level</label>
                  <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Enter grade level"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Student ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Enter student ID"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700">Preferred Name</label>
                  <input
                    type="text"
                    value={preferredName}
                    onChange={(e) => setPreferredName(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Enter preferred name"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Date of Entry</label>
                  <input
                    type="text"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Enter date of entry"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Class</label>
                  <input
                    type="text"
                    value={classroom}
                    onChange={(e) => setClassroom(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Enter class"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Languages</label>
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Enter languages spoken"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pastelPink to-pastelOrange text-white rounded-full hover:scale-105 transition-all duration-300"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
