import React, { useContext } from "react";
import { UserContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to={"/login"} />;
}
