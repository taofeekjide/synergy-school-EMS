import React, { useContext } from "react";
import { UserContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function RoleBasedRoutes({ children, requiredRole }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return user ? children : <Navigate to={"/login"} />;
}
