import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/authContext";

export default function List() {
  const [leaves, setLeaves] = useState([]);

  const { user } = useContext(UserContext);

  async function fetchLeaves() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/leave/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
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

  let sno = 1;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-gray-800 tracking-tight">
          Manage leaves
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          View, and request new leaves.
        </p>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <Link
          to="/employee/dashboard/add-leave"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow"
        >
          + Request New Leave
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="px-4 py-2 border-b">S/No</th>
              <th className="px-4 py-2 border-b">Leave Type</th>
              <th className="px-4 py-2 border-b">From</th>
              <th className="px-4 py-2 border-b">To</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {leaves.map((leave) => (
              <tr key={leave._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-center">{sno++}</td>
                <td className="px-4 py-2 border-b text-center">
                  {leave.leaveType}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {leave.reason}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
