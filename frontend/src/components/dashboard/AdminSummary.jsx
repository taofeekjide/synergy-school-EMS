import React from "react";
import AdminCard from "./AdminCard";
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBill, FaTimesCircle, FaUsers } from "react-icons/fa";

export default function AdminSummary() {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AdminCard
          icon={<FaUsers className="text-white text-2xl" />}
          text="Total Employees"
          number={20}
          color="bg-blue-600"
        />
        <AdminCard
          icon={<FaBuilding className="text-white text-2xl" />}
          text="Total Departments"
          number={20}
          color="bg-yellow-500"
        />
        <AdminCard
          icon={<FaMoneyBill className="text-white text-2xl" />}
          text="Monthly Pay"
          number={1000000}
          color="bg-green-600"
        />
      </div>
      <div className="mt-10">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">
          Leave Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <AdminCard
            icon={<FaFileAlt className="text-white text-2xl" />}
            text="Leave Applied"
            number={30}
            color="bg-blue-600"
          />
          <AdminCard
            icon={<FaCheckCircle className="text-white text-2xl" />}
            text="Leave Approved"
            number={18}
            color="bg-green-600"
          />
          <AdminCard
            icon={<FaHourglassHalf className="text-white text-2xl" />}
            text="Leave Pending"
            number={8}
            color="bg-yellow-500"
          />
          <AdminCard
            icon={<FaTimesCircle className="text-white text-2xl" />}
            text="Leave Rejected"
            number={4}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
}
