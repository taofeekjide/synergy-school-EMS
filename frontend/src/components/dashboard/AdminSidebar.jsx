import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaRegBuilding,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-screen bg-gray-800 text-white flex flex-col p-4">
      <div
        className={`mb-8 flex justify-between items-center ${
          isOpen ? "w-full" : "w-10"
        } `}
      >
        <h3
          className={`text-xl font-bold md:block ${
            isOpen ? "block" : "hidden"
          } `}
        >
          Employee MS
        </h3>
        <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FaTimes size={24} className="cursor-pointer" />
          ) : (
            <FaBars size={24} className="cursor-pointer" />
          )}
        </button>
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
            <span className={`md:block ${isOpen ? "block" : "hidden"} `}>
              Dashboard
            </span>
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
            <span className={`md:block ${isOpen ? "block" : "hidden"} `}>
              Employees
            </span>
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
            <span className={`md:block ${isOpen ? "block" : "hidden"} `}>
              Departments
            </span>
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
            <span className={`md:block ${isOpen ? "block" : "hidden"} `}>
              Leaves
            </span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
