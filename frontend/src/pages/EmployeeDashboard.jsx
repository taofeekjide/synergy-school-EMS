import React, { useEffect } from "react";
import Sidebar from "../components/EmployeeDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

export default function EmployeeDashboard() {
  useEffect(() => {
    const shouldReload = !window.location.hash.includes("reloaded");
    if (shouldReload) {
      window.location.replace(window.location.pathname + "#reloaded");
      window.location.reload();
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 h-screen bg-gray-100 ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
