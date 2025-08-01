import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 h-screen bg-gray-100 ">
        <Navbar />
        <Outlet/>
      </div>
    </div>
  );
}
