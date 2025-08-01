import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaCog, FaRegBuilding, FaTachometerAlt, FaUser } from "react-icons/fa";
import { UserContext } from "../../context/authContext";

export default function AdminSidebar() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-40 h-screen bg-gray-800 text-white flex flex-col p-4">
      <div className="mb-8">
        <h3 className="text-xl font-bold">Employee MS</h3>
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
            <span>Dashboard</span>
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
            <span>My Profile</span>
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
            <span>Leaves</span>
          </NavLink>

          <NavLink
            to={"/employee/dashboard/setting"}
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
