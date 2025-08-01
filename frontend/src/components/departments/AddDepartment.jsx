import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddDepartment() {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Here you would typically send the department data to your backend
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/department/add`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(response.data.success) {
        alert("Department added successfully!");
        navigate('/admin/dashboard/departments');
        
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-xl max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Add Department
      </h3>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Department Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Department Name
          </label>
          <input
            name="dep_name"
            id="name"
            type="text"
            placeholder="Enter Department Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Add Department
        </button>
      </form>
    </div>
  );
}
