import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import { employeeColumns } from "../../utils/Columns";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedEmployees, setSearchedEmployees] = useState([]);

  async function fetchEmployees() {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department?.dep_name,
          name: emp.userId?.name,
          startDate: new Date(emp.startDate).toLocaleDateString(),
          designation: emp.designation,
          action: <EmployeeButtons _id={emp._id} />,
        }));
        setEmployees(data);
        setSearchedEmployees(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function handleSearch(e) {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedEmployees(records);
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-800 tracking-tight">
              Manage Employees
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              View, search, and add employees to the system.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search by employee name..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
              />
            </div>

            <Link
              to="/admin/dashboard/add-employee"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow"
            >
              + Add New Employee
            </Link>
          </div>
          <div className="mt-6">
            <DataTable
              columns={employeeColumns}
              data={searchedEmployees}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
}
