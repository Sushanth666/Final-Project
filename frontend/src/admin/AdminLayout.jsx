import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import ThemeContext from "../../context/ThemeContext";

export default function AdminLayout() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"} min-h-screen p-6`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="md:col-span-1">
          <AdminSidebar />
        </div>
        <main className="md:col-span-5">
          <div className="p-6 rounded-xl shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
