import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaBuilding,
  FaRegBuilding,
  FaTachometerAlt,
  FaTimes,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { UserContext } from "../../context/authContext";

export default function AdminSidebar() {
  const { user } = useContext(UserContext);
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
            to={"/employee/dashboard"}
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
            to={`/employee/dashboard/profile/${user._id}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaUser />
            <span className={`md:block ${isOpen ? "block" : "hidden"} `}>
              My Profile
            </span>
          </NavLink>

          <NavLink
            to={"/employee/dashboard/leaves"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaRegBuilding />
            <span className={`md:block ${isOpen ? "block" : "hidden"} `}>
              Personal Leaves
            </span>
          </NavLink>

          <NavLink
            to={"/employee/dashboard/employees-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaUsers />
            <span className={`md:block ${isOpen ? "block" : "hidden"} `}>
              All Employees
            </span>
          </NavLink>

          <NavLink
            to={"/employee/dashboard/employees-leaves-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaBuilding />
            <span className={`md:block ${isOpen ? "block" : "hidden"} `}>
              All Employees Leaves
            </span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
