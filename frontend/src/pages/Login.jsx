import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/employee/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.success === false) {
        setError(error.response.data.message);
        setLoading(false);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-blue-100">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-blue-700 mb-1">
              Synergy School EMS
            </h1>
            <p className="text-sm text-gray-500">Employee Login Portal</p>
          </div>

          {error && (
            <div className="mb-4 text-center text-sm text-red-500 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="employee@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {loading ? (
              <div className="text-center">Loading, please wait...</div>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
              >
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
