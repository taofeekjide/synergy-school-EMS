import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewEmployee() {
  const [employee, setEmployee] = useState(null);

  const { id } = useParams();

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
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Details
          </h2>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile Image */}
            <div className="w-40 h-40 flex-shrink-0 overflow-hidden rounded-xl border border-gray-300">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${employee.userId.profileImage}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Employee Info */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-medium text-gray-500">Name:</p>
                <p className="text-base font-semibold text-gray-800">
                  {employee.userId.name}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">ID:</p>
                <p className="text-base font-semibold text-gray-800">
                  {employee.employeeId}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Start Date:</p>
                <p className="text-base font-semibold text-gray-800">
                  {new Date(employee.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Department:</p>
                <p className="text-base font-semibold text-gray-800">
                  {employee.department?.dep_name || "—"}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">
                  Designation/Position:
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {employee.designation}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">
                  Salary:
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {employee.salary.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
}
