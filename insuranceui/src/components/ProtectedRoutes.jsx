import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If user is not logged in
  if (!token) return <Navigate to="/login" replace />;

  // If this route requires a specific role 
  if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;

  return children;
}
