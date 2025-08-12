import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { leaveColumns } from "../../utils/Columns";
import { LeaveButtons } from "../../utils/Leavehelper";

export default function LeavesTable() {
  const [leaves, setLeaves] = useState([]);

  async function fetchLeaves() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/leaves/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId,
          name: leave.employeeId?.userId?.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days: Math.ceil(
            (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24)
          ),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="mb-6">
          <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Manage Leaves
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            View, accept, and reject leave requests in the system.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-all">
            Pending
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all">
            Approved
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all">
            Rejected
          </button>
        </div>
        {leaves.length > 0 ? (
          <DataTable columns={leaveColumns} data={leaves} pagination />
        ) : (
          <div className="text-gray-500 text-sm mt-4">
            No leave records found.
          </div>
        )}
      </div>
    </>
  );
}
