import React from "react";

export default function PlannerCalendar() {
  // Define a list of time slots for today
  const times = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
  const events = []; // Currently no scheduled events

  return (
    <div>
      <table className="min-w-full border-separate" style={{ borderSpacing: "10px" }}>
        <thead>
          <tr>
            <th className="text-left"></th>
            <th className="text-center font-medium text-gray-700">Today</th>
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="font-medium text-gray-700">{time}</td>
              <td className="bg-white rounded-2xl shadow-lg p-2 text-center text-gray-500">
                {/* No event scheduled */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {events.length === 0 && (
        <div className="mt-3 text-center text-gray-500">Nothing Yet!</div>
      )}
    </div>
  );
}
