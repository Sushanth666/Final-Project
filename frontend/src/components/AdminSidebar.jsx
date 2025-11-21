import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

const linkClass = (isActive, theme) =>
  `block px-4 py-3 rounded-lg font-medium transition ${
    isActive ? "bg-indigo-600 text-white" : theme === "dark" ? "text-gray-200 hover:bg-zinc-800" : "text-gray-700 hover:bg-gray-100"
  }`;

export default function AdminSidebar() {
  const { theme } = useContext(ThemeContext);
  return (
    <aside className={`w-64 p-6 rounded-xl ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} shadow-lg`}>
      <h3 className="text-xl font-bold mb-6">Admin Panel</h3>
      <nav className="space-y-2">
        <NavLink to="/admin" end className={({isActive}) => linkClass(isActive, theme)}>Dashboard</NavLink>
        <NavLink to="/admin/movies" className={({isActive}) => linkClass(isActive, theme)}>Movies</NavLink>
        <NavLink to="/admin/add-movie" className={({isActive}) => linkClass(isActive, theme)}>Add Movie</NavLink>
        <NavLink to="/admin/bulk-upload" className={({isActive}) => linkClass(isActive, theme)}>Bulk Upload</NavLink>
        <NavLink to="/admin/users" className={({isActive}) => linkClass(isActive, theme)}>Users</NavLink>
        <NavLink to="/admin/reviews" className={({isActive}) => linkClass(isActive, theme)}>Reviews</NavLink>
      </nav>
    </aside>
  );
}
