import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { IEPContext } from "../context/IEPContext";

export default function Classrooms() {
  const navigate = useNavigate();
  const { iepReports } = useContext(IEPContext);

  // Group reports by classroom (only include if classroom field exists)
  const grouped = iepReports.reduce((acc, report) => {
    const room = report.studentInfo.classroom;
    if (room) {
      acc[room] = acc[room] || [];
      acc[room].push(report);
    }
    return acc;
  }, {});

  return (
    <div className="flex h-screen font-sans bg-offwhite">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8 overflow-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Classrooms</h1>
          {Object.keys(grouped).length === 0 ? (
            <p className="text-gray-600">No IEP reports have been written yet.</p>
          ) : (
            Object.keys(grouped).map((room) => (
              <div key={room} className="mb-8">
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">Classroom {room}</h2>
                <ul className="space-y-4">
                  {grouped[room].map((report, index) => (
                    <li
                      key={index}
                      className="p-6 bg-white rounded-2xl shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => navigate("/iep-report")}
                    >
                      <p className="text-xl font-bold text-gray-800">{report.studentInfo.studentName}</p>
                      <p className="text-gray-600">Grade: {report.studentInfo.grade}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
