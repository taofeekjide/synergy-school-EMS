import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6 text-blue-600">
          <FaExclamationTriangle className="w-16 h-16" />
        </div>

        <h1 className="text-6xl font-extrabold text-blue-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Go to Login
          </Link>
          <Link
            to="/public-demo"
            className="text-blue-700 border border-blue-700 px-6 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Visit Public Demo
          </Link>
          <Link
            to="/"
            className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Go to Landing Page
          </Link>
        </div>
      </div>
    </div>
  );
}
