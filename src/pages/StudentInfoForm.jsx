import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import { IEPContext } from "../context/IEPContext";

export default function StudentInformationForm() {
  const navigate = useNavigate();
  const { iepData, updateStudentInfo } = useContext(IEPContext);
  
  // Initialize fields from context (iepData.studentInfo)
  const [studentName, setStudentName] = useState(iepData.studentInfo.studentName || "");
  const [preferredName, setPreferredName] = useState(iepData.studentInfo.preferredName || "");
  const [dob, setDob] = useState(iepData.studentInfo.dob || "");
  const [entryDate, setEntryDate] = useState(iepData.studentInfo.entryDate || "");
  const [grade, setGrade] = useState(iepData.studentInfo.grade || "");
  const [classroom, setClassroom] = useState(iepData.studentInfo.classroom || "");
  const [studentId, setStudentId] = useState(iepData.studentInfo.studentId || "");
  const [language, setLanguage] = useState(iepData.studentInfo.language || "");
  
  // (Optional) useEffect hooks to update if context changes
  useEffect(() => { setStudentName(iepData.studentInfo.studentName || ""); }, [iepData.studentInfo.studentName]);
  useEffect(() => { setPreferredName(iepData.studentInfo.preferredName || ""); }, [iepData.studentInfo.preferredName]);
  useEffect(() => { setDob(iepData.studentInfo.dob || ""); }, [iepData.studentInfo.dob]);
  useEffect(() => { setEntryDate(iepData.studentInfo.entryDate || ""); }, [iepData.studentInfo.entryDate]);
  useEffect(() => { setGrade(iepData.studentInfo.grade || ""); }, [iepData.studentInfo.grade]);
  useEffect(() => { setClassroom(iepData.studentInfo.classroom || ""); }, [iepData.studentInfo.classroom]);
  useEffect(() => { setStudentId(iepData.studentInfo.studentId || ""); }, [iepData.studentInfo.studentId]);
  useEffect(() => { setLanguage(iepData.studentInfo.language || ""); }, [iepData.studentInfo.language]);
  
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
    if (!studentName.trim() || !grade.trim() || !classroom.trim()) {
      alert("Please fill out the required fields: Student Name, Grade Level, and Class.");
      return;
    }
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
        {/* Progress Bar */}
        <div className="mt-4 mb-4 max-w-3xl mx-auto">
          <ProgressBar progress={overallProgress} />
          <p className="text-sm text-gray-600 mt-1 text-center">
            Overall Progress: {overallProgress}%
          </p>
        </div>
        <div className="pt-8 p-8 overflow-auto">
          <form onSubmit={handleNext} className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Student Information</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="min-h-24">
                  <label className="block text-lg font-medium text-gray-700">
                    Student Name<span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the student's full legal name.
                  </p>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="e.g. Johnathan Doe"
                    required
                  />
                </div>
                <div className="min-h-24">
                  <label className="block text-lg font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the student's birthdate.
                  </p>
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="DDMMYYYY"
                  />
                </div>
                <div className="min-h-24">
                  <label className="block text-lg font-medium text-gray-700">
                    Grade Level<span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Select the current grade level (1–12).
                  </p>
                  <input
                    list="gradeLevels"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="e.g. 5"
                    required
                  />
                  <datalist id="gradeLevels">
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={`${i + 1}`} />
                    ))}
                  </datalist>
                </div>
                <div className="min-h-24">
                  <label className="block text-lg font-medium text-gray-700">
                    Student ID
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the student's ID number (if available).
                  </p>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="e.g. 123456"
                  />
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-6">
                <div className="min-h-24">
                  <label className="block text-lg font-medium text-gray-700">
                    Preferred Name
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the name the student usually goes by.
                  </p>
                  <input
                    type="text"
                    value={preferredName}
                    onChange={(e) => setPreferredName(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="e.g. John"
                  />
                </div>
                <div className="min-h-24">
                  <label className="block text-lg font-medium text-gray-700">
                    Date of Entry
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the date the student started at the school.
                  </p>
                  <input
                    type="text"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="DDMMYYYY"
                  />
                </div>
                <div className="min-h-24">
                  <label className="block text-lg font-medium text-gray-700">
                    Class<span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the class assignment (e.g. Class A or Class B).
                  </p>
                  <input
                    list="classOptions"
                    value={classroom}
                    onChange={(e) => setClassroom(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="e.g. Class A"
                    required
                  />
                  <datalist id="classOptions">
                    <option value="Class A" />
                    <option value="Class B" />
                  </datalist>
                </div>
                <div className="min-h-24">
                  <label className="block text-lg font-medium text-gray-700">
                    Languages
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the language(s) the student speaks (use commas).
                  </p>
                  <input
                    list="languageOptions"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-2 block w-full border border-gray-300 rounded-2xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="e.g. English"
                  />
                  <datalist id="languageOptions">
                    <option value="English" />
                    <option value="Mandarin Chinese" />
                    <option value="Hindi" />
                    <option value="Spanish" />
                    <option value="French" />
                    <option value="Standard Arabic" />
                    <option value="Bengali" />
                    <option value="Russian" />
                    <option value="Portuguese" />
                    <option value="Indonesian" />
                    <option value="Urdu" />
                    <option value="German" />
                    <option value="Japanese" />
                    <option value="Swahili" />
                    <option value="Marathi" />
                    <option value="Telugu" />
                    <option value="Turkish" />
                    <option value="Tamil" />
                    <option value="Vietnamese" />
                    <option value="Korean" />
                    <option value="Italian" />
                    <option value="Persian (Farsi)" />
                    <option value="Gujarati" />
                    <option value="Polish" />
                    <option value="Ukrainian" />
                    <option value="Kannada" />
                    <option value="Malayalam" />
                    <option value="Oriya" />
                    <option value="Burmese" />
                    <option value="Romanian" />
                  </datalist>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pastelPink to-pastelOrange text-white rounded-full hover:scale-105 transition-all duration-500"
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
