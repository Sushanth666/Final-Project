import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function ProtectedAdminRoute() {
  const { user } = useContext(AuthContext) || {};
  // fallback: attempt to read token/user from localStorage
  const stored = JSON.parse(localStorage.getItem("user") || "null");
  const curUser = user || stored;

  if (!curUser) return <Navigate to="/login" replace />;
  if (curUser.role !== "admin") return <Navigate to="/home" replace />;

  return <Outlet />;
}
