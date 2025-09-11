import React, { useContext, useState } from "react";
import { UserContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const { user } = useContext(UserContext);
  const [leave, setLeave] = useState({
    userId: user._id,
    userEmail: user.email,
    userName: user.name,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setLeave((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    //add leave
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert("Leave added successfully");
        //send notification
        try {
          const response1 = await axios.post(
            `${import.meta.env.VITE_API_URL}/send-email`,
            leave,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response1.data.success) {
            alert("Leave notification sent successfully");
          }
        } catch (notifyError) {
          alert("Failed to send notification: ", notifyError);
        }
        navigate("/employee/dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setLoading(false);
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md mt-7">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Request for a Leave
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Leave Type
          </label>
          <select
            name="leaveType"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select Leave
            </option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason / Description
          </label>
          <textarea
            name="reason"
            onChange={handleChange}
            required
            rows={4}
            placeholder="Enter reason for leave..."
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          {loading ? (
            <div className="text-center">Loading, please wait...</div>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all font-medium"
            >
              + Add Leave
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
