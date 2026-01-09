import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/authContext";

export default function LandingPage() {
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  async function handleDemoLogin() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: "demo1@gmail.com",
          password: "demo12345",
        }
      );

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        navigate("/employee/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert("Demo login failed. Please try again later.");
    }
  }
  async function handleAdminLogin() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: "admin@example.com",
          password: "Admin123@",
        }
      );

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert("Demo login failed. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Welcome to Synergy School Employee Management System
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          This platform helps our school manage employee records and leave
          requests efficiently. Only authorized staff can log in.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all w-full sm:w-auto whitespace-nowrap"
          >
            Login (Employees Only)
          </button>

          <button
            onClick={handleDemoLogin}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition-all shadow w-full sm:w-auto whitespace-nowrap"
          >
            Try as Demo Employee
          </button>
          
          <button
            onClick={handleAdminLogin}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition-all shadow w-full sm:w-auto whitespace-nowrap"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
