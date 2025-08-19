import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utils/fetchDepartmentforEmployee";

export default function EditEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    salary: 0,
    designation: "",
    startDate: "",
    department: "",
  });
  const [departments, setDepartments] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getDepartments() {
      const data = await fetchDepartments();
      setDepartments(data);
    }
    getDepartments();
  }, []);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            startDate: employee.startDate,
            designation: employee.designation,
            departmnent: employee.department,
            salary: employee.salary,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
    fetchEmployee();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert("Employee edited successfully!");
        navigate("/admin/dashboard/employees");
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        alert(error.response.data.error);
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  }

  return (
    <>
      {departments && employee ? (
        <div className="p-6 bg-white rounded-2xl shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Employee
          </h2>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={employee.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                name="startDate"
                type="date"
                value={employee.startDate}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <input
                name="designation"
                type="text"
                placeholder="HOD/Senior Teacher/Intern"
                value={employee.designation}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="department"
                value={employee.department}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                defaultValue=""
                required
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary (₦)
              </label>
              <input
                name="salary"
                type="number"
                value={employee.salary}
                placeholder="e.g. 150000"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all font-medium"
              >
                Edit Employee
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
}
