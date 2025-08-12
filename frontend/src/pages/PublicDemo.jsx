import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

export default function PublicDemo() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchEmployees();
    fetchLeaves();
  }, []);

  async function fetchEmployees() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/public/employees`
      );
      if (response.data.success) {
        let sno = 1;
        const data = response.data.employees.map((emp) => ({
          sno: sno++,
          name: emp.userId?.name,
          email: emp.userId?.email,
          department: emp.department?.dep_name,
          position: emp.designation,
          startDate: new Date(emp.startDate).toLocaleDateString(),
        }));
        setEmployees(data);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  }

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
      }
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  }

  const employeeColumns = [
    { name: "S/No", selector: (row) => row.sno },
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.email },
    { name: "Department", selector: (row) => row.department },
    { name: "Position", selector: (row) => row.position },
    { name: "Date Joined/Start Date", selector: (row) => row.startDate },
  ];

  const leaveColumns = [
    { name: "S/No", selector: (row) => row.sno },
    { name: "Name", selector: (row) => row.name },
    { name: "Department", selector: (row) => row.department },
    { name: "Leave Type", selector: (row) => row.leaveType },
    { name: "Start Date", selector: (row) => row.startDate },
    { name: "End Date", selector: (row) => row.endDate },
    { name: "Status", selector: (row) => row.status },
  ];

  const filteredLeaves =
    filter === "All"
      ? leaves
      : leaves.filter((leave) => leave.status === filter);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          Welcome to the Public Demo
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our Employee Management System. Below is a live preview of
          employee records and their leave requests. This is for public view
          only.
        </p>
      </div>

      <div className="mb-12">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              📋 Employee Records
            </h2>
          </div>
          <DataTable
            columns={employeeColumns}
            data={employees}
            pagination
            highlightOnHover
            striped
          />
        </div>
      </div>

      <div>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              📝 Leave Requests
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
          <DataTable
            columns={leaveColumns}
            data={filteredLeaves}
            pagination
            highlightOnHover
            striped
          />
        </div>
      </div>
    </div>
  );
}
