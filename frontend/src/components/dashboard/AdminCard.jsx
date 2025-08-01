import React from "react";

export default function AdminCard({
  icon,
  text,
  number,
  color = "bg-blue-600",
}) {
  const formattedNumber = number.toLocaleString();

  return (
    <div className="flex items-center gap-4 bg-white shadow-md p-5 rounded-2xl border border-gray-100 hover:shadow-lg transition">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm font-bold ">{text}</p>
        <p className="text-xl font-bold text-gray-800">{formattedNumber} </p>
      </div>
    </div>
  );
}
