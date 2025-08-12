import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBill,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

export default function AdminSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const summary = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dashboard/summary`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(summary);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
      }
    }
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading....</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AdminCard
          icon={<FaUsers className="text-white text-2xl" />}
          text="Total Employees"
          number={summary.data.totalEmployees}
          color="bg-blue-600"
        />
        <AdminCard
          icon={<FaBuilding className="text-white text-2xl" />}
          text="Total Departments"
          number={summary.data.totalDepartments}
          color="bg-yellow-500"
        />
        <AdminCard
          icon={<FaMoneyBill className="text-white text-2xl" />}
          text="Monthly Pay"
          number={summary.data.totalSalary}
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
            number={summary.data.leaveSummary.leaveAppliedFor}
            color="bg-blue-600"
          />
          <AdminCard
            icon={<FaCheckCircle className="text-white text-2xl" />}
            text="Leave Approved"
            number={summary.data.leaveSummary.approved}
            color="bg-green-600"
          />
          <AdminCard
            icon={<FaHourglassHalf className="text-white text-2xl" />}
            text="Leave Pending"
            number={summary.data.leaveSummary.pending}
            color="bg-yellow-500"
          />
          <AdminCard
            icon={<FaTimesCircle className="text-white text-2xl" />}
            text="Leave Rejected"
            number={summary.data.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
}
