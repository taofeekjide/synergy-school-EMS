import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCog,
  FaMoneyBill,
  FaRegBuilding,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

export default function AdminSidebar() {
  return (
    <div className="w-40 h-screen bg-gray-800 text-white flex flex-col p-4">
      <div className="mb-8">
        <h3 className="text-xl font-bold">Employee MS</h3>
      </div>
      <div>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to={"/admin/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
            end
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to={"/admin/dashboard/employees"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaUsers />
            <span>Employees</span>
          </NavLink>

          <NavLink
            to={"/admin/dashboard/departments"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaRegBuilding />
            <span>Departments</span>
          </NavLink>

          <NavLink
            to={"/admin/dashboard/leaves"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaCalendarAlt />
            <span>Leaves</span>
          </NavLink>

          <NavLink
            to={"/admin/settings"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
