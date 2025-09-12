import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function LeaveDetail() {
  const [leave, setLeave] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLeave() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
    fetchLeave();
  }, []);

  async function changeStatus(id, status) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/leave/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert(
          response.data.message || "Leave status updated and notification sent!"
        );
        navigate("/admin/dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("Something went wrong while updating the leave");
      }
    }
  }

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Leave Details
          </h2>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-40 h-40 flex-shrink-0 overflow-hidden rounded-xl border border-gray-300">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${
                  leave.employeeId.userId.profileImage
                }`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-medium text-gray-500">Name:</p>
                <p className="text-base font-semibold text-gray-800">
                  {leave.employeeId.userId.name}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">ID:</p>
                <p className="text-base font-semibold text-gray-800">
                  {leave.employeeId.employeeId}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Leave Type:</p>
                <p className="text-base font-semibold text-gray-800">
                  {leave.leaveType}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Reason:</p>
                <p className="text-base font-semibold text-gray-800">
                  {leave.reason}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Department:</p>
                <p className="text-base font-semibold text-gray-800">
                  {leave.employeeId.department?.dep_name || "—"}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Start Date:</p>
                <p className="text-base font-semibold text-gray-800">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">End Date:</p>
                <p className="text-base font-semibold text-gray-800">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500">
                  Designation/Position:
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {leave.employeeId.designation}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-500 mb-1">
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </p>

                {leave.status === "Pending" ? (
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-lg
        ${
          leave.status === "Approved"
            ? "bg-green-100 text-green-700"
            : leave.status === "Rejected"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
                  >
                    {leave.status}
                  </span>
                )}
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
