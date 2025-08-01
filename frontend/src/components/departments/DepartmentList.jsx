import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
import { columns } from "../../utils/Columns";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedDepartmemnts, setSearchedDepartmemnts] = useState([]);

  // async function onDeleteDepartment(id) {
  //   await fetchDepartments()
  //   const data = departments.filter((dep) => dep._id !== id);
  //   setDepartments(data);
  // }
  async function onDeleteDepartment(id) {
    try {
      // Optimistic update (optional): remove from UI first
      setDepartments((prev) => prev.filter((dep) => dep._id !== id));

      // Then refresh to be sure backend is in sync
      await fetchDepartments();
    } catch (error) {
      console.error("Failed to refresh departments", error);
    }
  }

  async function fetchDepartments() {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/department`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDeleteDepartment={onDeleteDepartment}
            />
          ),
        }));
        setDepartments(data);
        setSearchedDepartmemnts(data);
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
    fetchDepartments();
  }, []);

  function searchDepartments(e) {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedDepartmemnts(records);
  }

  return (
    <>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="p-6 bg-white shadow-md rounded-xl">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Manage Departments
            </h3>
          </div>

          {/* Search + Add */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <input
              type="text"
              placeholder="Search by department name"
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={searchDepartments}
            />

            <Link
              to="/admin/dashboard/add-department"
              className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
            >
              + Add Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={searchedDepartmemnts} pagination />
          </div>
        </div>
      )}
    </>
  );
}
