import React, { createContext, useState } from "react";

export const IEPContext = createContext();

export function IEPProvider({ children }) {
  // Store the ongoing IEP data from the multi‐step forms
  const [iepData, setIepData] = useState({
    studentInfo: {},
    needs: {},
    strengths: {},
    goal: {}
  });

  // Store completed IEP reports
  const [iepReports, setIepReports] = useState([]);

  const updateStudentInfo = (data) => setIepData((prev) => ({ ...prev, studentInfo: data }));
  const updateNeeds = (data) => setIepData((prev) => ({ ...prev, needs: data }));
  const updateStrengths = (data) => setIepData((prev) => ({ ...prev, strengths: data }));
  const updateGoal = (data) => setIepData((prev) => ({ ...prev, goal: data }));

  const finalizeReport = () => {
    const report = { ...iepData };
    setIepReports((prev) => [...prev, report]);
    // Optionally reset iepData for a new report
    setIepData({ studentInfo: {}, needs: {}, strengths: {}, goal: {} });
  };

  return (
    <IEPContext.Provider
      value={{
        iepData,
        updateStudentInfo,
        updateNeeds,
        updateStrengths,
        updateGoal,
        finalizeReport,
        iepReports
      }}
    >
      {children}
    </IEPContext.Provider>
  );
}
