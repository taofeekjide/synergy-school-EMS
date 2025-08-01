import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/authContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="bg-gray-700 text-white p-4 flex justify-between items-center">
      <p>Welcome {user.name}</p>
      <button className="px-4 py-1 bg-gray-800 hover:cursor-pointer" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
