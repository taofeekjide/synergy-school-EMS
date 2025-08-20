import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

export default function PublicDemo() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
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
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
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

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              📋 Employee Records
            </h2>
          </div>
          {loading ? (
            <div>Loading, Please wait...</div>
          ) : (
            <DataTable
              columns={employeeColumns}
              data={employees}
              pagination
              highlightOnHover
              striped
            />
          )}
        </div>
      </div>
    </div>
  );
}
