import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";

export default function Users() {
  const { theme } = useContext(ThemeContext);
  const { token: ctxToken } = useContext(AuthContext) || {};
  const token = ctxToken || localStorage.getItem("token");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setUsers)
      .catch(() => setUsers([]));
  }, [token]);

  const promote = async (id) => {
    if (!confirm("Make this user an admin?")) return;
    const res = await fetch(`/api/admin/users/${id}/promote`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setUsers(prev => prev.map(u => u._id===id ? { ...u, role: "admin" } : u));
  };

  const remove = async (id) => {
    if (!confirm("Delete this user?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setUsers(prev => prev.filter(u => u._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="space-y-3">
        {users.map(u => (
          <div key={u._id} className={`p-3 rounded ${theme==='dark'?'bg-gray-800':'bg-white'} shadow flex justify-between items-center`}>
            <div>
              <div className="font-semibold">{u.name || u.email}</div>
              <div className="text-sm text-gray-400">{u.email} • <span className="font-medium">{u.role || 'user'}</span></div>
            </div>
            <div className="flex gap-2">
              {u.role !== "admin" && <button onClick={() => promote(u._id)} className="px-3 py-1 bg-indigo-600 text-white rounded">Promote</button>}
              <button onClick={() => remove(u._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
