import React, { useContext } from "react";
import { FaCalendarDay, FaUser } from "react-icons/fa";
import { UserContext } from "../../context/authContext";

export default function EmployeeSummaryCard() {
  const { user } = useContext(UserContext);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-between items-center bg-white shadow-md p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition">
      {/* Left */}
      <div className="flex items-center gap-5">
        <div className="bg-blue-100 text-blue-600 p-4 rounded-xl text-2xl">
          <FaUser />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Welcome back</p>
          <p className="text-2xl font-bold text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <FaCalendarDay className="inline" />
            {today}
          </p>
        </div>
      </div>

      {/* Right (Optional activity summary) */}
      <div className="text-right">
        <p className="text-xs text-gray-400 mt-1 italic">
          "Stay focused and productive today."
        </p>
      </div>
    </div>
  );
}
