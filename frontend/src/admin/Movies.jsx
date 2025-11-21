import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";

export default function Movies() {
  const { theme } = useContext(ThemeContext);
  const { token: ctxToken } = useContext(AuthContext) || {};
  const token = ctxToken || localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/movies?page=1&limit=1000", { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(res => res.json())
      .then(setMovies)
      .catch(err => console.error(err));
  }, [token]);

  const deleteMovie = async (id) => {
    if (!confirm("Delete movie? This is permanent.")) return;
    try {
      const res = await fetch(`/api/movies/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Delete failed");
      setMovies(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      alert("Failed to delete movie");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Movies</h2>
        <div className="flex gap-2">
          <button onClick={() => navigate("/admin/add-movie")} className="px-4 py-2 bg-indigo-600 text-white rounded">Add Movie</button>
          <button onClick={() => navigate("/admin/bulk-upload")} className="px-4 py-2 bg-amber-500 text-black rounded">Bulk Upload</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map(m => (
          <div key={m._id} className={`p-4 rounded-lg ${theme==='dark'?'bg-gray-800':'bg-white'} shadow`}>
            <img src={m.image} alt={m.title} className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="font-semibold">{m.title}</h3>
            <p className="text-sm text-gray-400">{m.genre?.slice(0,2).join(", ")}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => navigate(`/admin/edit-movie/${m._id}`, { state: { movie: m } })} className="px-3 py-1 rounded bg-indigo-600 text-white">Edit</button>
              {/* Delete route not implemented in server; add route if needed */}
              <button onClick={() => deleteMovie(m._id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
