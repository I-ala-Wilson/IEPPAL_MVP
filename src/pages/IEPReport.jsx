// src/pages/IEPReport.jsx
import React, { useContext } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import { IEPContext } from "../context/IEPContext";
import { useNavigate } from "react-router-dom";

export default function IEPReport() {
  const navigate = useNavigate();
  const { iepReports } = useContext(IEPContext);
  const report = iepReports[iepReports.length - 1];

  const handleExportPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;

    // Page 1: Title
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("INDIVIDUAL EDUCATION PLAN (IEP)", pageWidth / 2, 30, { align: "center" });

    // Student Information Table Title
    doc.setFontSize(12);
    doc.setFillColor(128, 128, 128);
    doc.rect(margin, 40, pageWidth - margin * 2, 10, "F");
    doc.setTextColor(255);
    doc.text("STUDENT INFORMATION", pageWidth / 2, 47, { align: "center" });

    const studentData = [
      ["Student Name", "Grade Level", report?.studentInfo?.studentName || "N/A", report?.studentInfo?.grade || "N/A"],
      ["Preferred Name", "Class", report?.studentInfo?.preferredName || "N/A", report?.studentInfo?.classroom || "N/A"],
      ["DOB (DDMMYYYY)", "Student ID", report?.studentInfo?.dob || "N/A", report?.studentInfo?.studentId || "N/A"],
      ["Date of Entry", "Languages", report?.studentInfo?.entryDate || "N/A", report?.studentInfo?.language || "N/A"],
    ];

    autoTable(doc, {
      startY: 55,
      head: [],
      body: studentData.flatMap(row => [
        { content: row[0], styles: { fontStyle: "bold" } },
        { content: row[1], styles: { fontStyle: "bold" } },
        row[2],
        row[3],
      ]),
      columns: [
        { header: "", dataKey: "leftLabel", width: 45 },
        { header: "", dataKey: "rightLabel", width: 45 },
        { header: "", dataKey: "leftValue", width: 45 },
        { header: "", dataKey: "rightValue", width: 45 },
      ],
      theme: "grid",
      styles: { fontSize: 11, cellPadding: 4, minCellHeight: 15 },
      margin: { left: margin, right: margin },
    });

    // Student Needs Table Title
    doc.setFillColor(128, 128, 128);
    doc.rect(margin, doc.lastAutoTable.finalY + 10, pageWidth - margin * 2, 10, "F");
    doc.setTextColor(255);
    doc.text("STUDENT NEEDS", pageWidth / 2, doc.lastAutoTable.finalY + 17, { align: "center" });

    const needsData = [
      [
        `Functional Need in Area(s) of:\n${report?.needs?.functionalNeeds || "N/A"}\n\n` +
          `Non-Academic Needs:\n${report?.needs?.nonAcademicNeeds || "N/A"}\n\n` +
          `Background Information:\n${report?.needs?.backgroundInfo || "N/A"}\n\n` +
          `Psychoeducational Report Summary:\n${report?.needs?.psychoReport || "N/A"}`,
        `Diagnosis Awareness (Y/N):\n${report?.needs?.diagnosisAwareness || "N/A"}`
      ]
    ];

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      body: needsData,
      columns: [
        { dataKey: 0, width: pageWidth * 0.7 - margin * 2 },
        { dataKey: 1, width: pageWidth * 0.3 - margin * 2 },
      ],
      theme: "grid",
      styles: { fontSize: 11, cellPadding: 4, minCellHeight: 80 },
      margin: { left: margin, right: margin },
    });

    // Page 2: Strengths & Areas for Growth Title
    doc.addPage();
    doc.setFillColor(128, 128, 128);
    doc.rect(margin, 30, pageWidth - margin * 2, 10, "F");
    doc.setTextColor(255);
    doc.text("STUDENT STRENGTHS & AREAS FOR GROWTH", pageWidth / 2, 37, { align: "center" });

    const strengthsData = [
      [`Student Strengths:\n${report?.strengths?.strengths || "N/A"}`],
      [`Student Areas for Growth:\n${report?.strengths?.areasForGrowth || "N/A"}`]
    ];

    autoTable(doc, {
      startY: 45,
      body: strengthsData,
      theme: "grid",
      styles: { fontSize: 11, cellPadding: 4, minCellHeight: 40 },
      margin: { left: margin, right: margin },
    });

    // Student Goals Table Title
    doc.setFillColor(128, 128, 128);
    doc.rect(margin, doc.lastAutoTable.finalY + 10, pageWidth - margin * 2, 10, "F");
    doc.setTextColor(255);
    doc.text("STUDENT GOALS", pageWidth / 2, doc.lastAutoTable.finalY + 17, { align: "center" });

    const goalsData = [
      [`Goal Overview:\n${report?.goal?.goalOverview || "N/A"}`],
      [`Aligned Standards:\n${(report?.goal?.alignedStandard || []).join(", ") || "N/A"}`],
      [`Recommended Strategies:\n${(report?.goal?.recommendedStrategies || []).join(", ") || "N/A"}`],
      [`Measurement:\n${report?.goal?.goalMeasurement || "N/A"}`]
    ];

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      body: goalsData,
      theme: "grid",
      styles: { fontSize: 11, cellPadding: 4, minCellHeight: 40 },
      margin: { left: margin, right: margin },
    });

    doc.save(`${report?.studentInfo?.studentName || "IEP_Report"}.pdf`);
  };

  if (!report) {
    return (
      <div className="flex h-screen font-sans bg-offwhite">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800">No IEP Report Available</h2>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full hover:scale-105 transition-all duration-300"
            >
              Return to Home Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { studentInfo, needs, strengths, goal } = report;

  return (
    <div className="flex h-screen font-sans bg-offwhite">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Navbar />
        {/* Progress Bar – IEP Report is complete */}
        <div className="p-4 max-w-7xl mx-auto">
          <ProgressBar progress={100} />
          <p className="text-sm text-gray-600 mt-1">Progress: 100%</p>
        </div>
        <div id="reportContent" className="p-8 w-full max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            IEP Report for {studentInfo.studentName || "N/A"}
          </h1>
          
          {/* Student Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center bg-gray-700 text-white p-2 rounded">
              STUDENT INFORMATION
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <InfoRow label="Student Name" value={studentInfo.studentName} />
                <InfoRow label="Preferred Name" value={studentInfo.preferredName} />
                <InfoRow label="DOB (DDMMYYYY)" value={studentInfo.dob} />
                <InfoRow label="Date of Entry (DDMMYYYY)" value={studentInfo.entryDate} />
              </div>
              <div className="space-y-4">
                <InfoRow label="Grade Level" value={studentInfo.grade} />
                <InfoRow label="Class" value={studentInfo.classroom} />
                <InfoRow label="Student ID" value={studentInfo.studentId} />
                <InfoRow label="Languages" value={studentInfo.language} />
              </div>
            </div>
          </div>

          {/* Student Needs */}
          <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center bg-gray-700 text-white p-2 rounded">
              STUDENT NEEDS
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-4">
                <FormattedSection title="Functional Need in Area(s) of:" content={needs.functionalNeeds} />
                <FormattedSection title="Non-Academic Needs:" content={needs.nonAcademicNeeds} />
                <FormattedSection title="Background Information:" content={needs.backgroundInfo} />
                <FormattedSection title="Psychoeducational Report Summary:" content={needs.psychoReport} />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="font-semibold mb-2">Diagnosis Awareness (Y/N):</p>
                  <p className="text-lg">{needs.diagnosisAwareness || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Strengths & Areas for Growth */}
          <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center bg-gray-700 text-white p-2 rounded">
              STUDENT STRENGTHS & AREAS FOR GROWTH
            </h2>
            <div className="space-y-4">
              <FormattedSection title="Student Strengths:" content={strengths.strengths} />
              <FormattedSection title="Student Areas for Growth:" content={strengths.areasForGrowth} />
            </div>
          </div>

          {/* Student Goals */}
          <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center bg-gray-700 text-white p-2 rounded">
              STUDENT GOALS
            </h2>
            <div className="space-y-4">
              <FormattedSection title="Goal Overview:" content={goal.goalOverview} />
              <FormattedSection 
                title="Aligned Standards:" 
                content={goal.alignedStandard?.join(", ") || "N/A"} 
              />
              <FormattedSection 
                title="Recommended Strategies:" 
                content={goal.recommendedStrategies?.join(", ") || "N/A"} 
              />
              <FormattedSection title="Measurement:" content={goal.goalMeasurement} />
            </div>
          </div>
        </div>
        
        <div className="p-8 flex justify-between">
          <button
            onClick={handleExportPDF}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full hover:scale-105 transition-all duration-300"
          >
            Export IEP to PDF
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-600 text-white rounded-full hover:scale-105 transition-all duration-300"
          >
            Return to Home Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper components
const InfoRow = ({ label, value }) => (
  <div className="border-b border-gray-300 pb-2">
    <p className="font-semibold text-gray-700">{label}</p>
    <p className="text-gray-900">{value || "N/A"}</p>
  </div>
);

const FormattedSection = ({ title, content }) => (
  <div className="mb-4">
    <h3 className="font-semibold text-gray-700 mb-1">{title}</h3>
    <p className="text-gray-900 whitespace-pre-wrap">{content || "N/A"}</p>
  </div>
);
