import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { leaveColumns } from "../../utils/Columns";
import { LeaveButtons } from "../../utils/Leavehelper";

export default function LeavesTable() {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const filteredLeaves =
    filter === "All"
      ? leaves
      : leaves.filter((leave) => leave.status === filter);

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
        setLoading(false);
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

        <div className="flex gap-2 mt-4 mb-6 flex-wrap">
          {["All", "Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === status
                  ? "bg-blue-700 text-white"
                  : status === "Pending"
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : status === "Approved"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : status === "Rejected"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        {loading ? (
          <div>Loading, Please wait...</div>
        ) : leaves.length > 0 ? (
          <DataTable columns={leaveColumns} data={filteredLeaves} pagination />
        ) : (
          <div> No leaves Found </div>
        )}
      </div>
    </>
  );
}
