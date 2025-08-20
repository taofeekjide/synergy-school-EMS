import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

export default function AllLeavesRecords() {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  async function fetchLeaves() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/public/leaves`
      );
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          sno: sno++,
          name: leave.employeeId?.userId?.name,
          department: leave.employeeId?.department?.dep_name,
          leaveType: leave.leaveType,
          startDate: new Date(leave.startDate).toLocaleDateString(),
          endDate: new Date(leave.endDate).toLocaleDateString(),
          status: leave.status,
        }));
        setLeaves(data);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  }

  const filteredLeaves =
    filter === "All"
      ? leaves
      : leaves.filter((leave) => leave.status === filter);

  const leaveColumns = [
    { name: "S/No", selector: (row) => row.sno },
    { name: "Name", selector: (row) => row.name },
    { name: "Department", selector: (row) => row.department },
    { name: "Leave Type", selector: (row) => row.leaveType },
    { name: "Start Date", selector: (row) => row.startDate },
    { name: "End Date", selector: (row) => row.endDate },
    { name: "Status", selector: (row) => row.status },
  ];

  return (
    <div>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            📝 Leave Records
          </h2>
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
        ) : (
          <DataTable
            columns={leaveColumns}
            data={filteredLeaves}
            pagination
            highlightOnHover
            striped
          />
        )}
      </div>
    </div>
  );
}
