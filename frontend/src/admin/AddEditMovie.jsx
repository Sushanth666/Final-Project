import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";

export default function AddEditMovie() {
  const { theme } = useContext(ThemeContext);
  const { token: ctxToken } = useContext(AuthContext) || {};
  const token = ctxToken || localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editingMovie = location.state?.movie || null;

  const [form, setForm] = useState({
    title: "", year: "", genre: "", duration: "", director: "", language: "", description: "", image: "", trailerUrl: "", rating: ""
  });

  useEffect(() => {
    if (editingMovie) {
      setForm({
        title: editingMovie.title || "",
        year: editingMovie.year || "",
        genre: (editingMovie.genre || []).join(", "),
        duration: editingMovie.duration || "",
        director: editingMovie.director || "",
        language: editingMovie.language || "",
        description: editingMovie.description || "",
        image: editingMovie.image || "",
        trailerUrl: editingMovie.trailerUrl || "",
        rating: editingMovie.rating || ""
      });
    }
  }, [editingMovie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      genre: form.genre.split(",").map(s => s.trim()),
      year: Number(form.year),
      duration: Number(form.duration),
      rating: Number(form.rating)
    };

    try {
      const url = editingMovie ? `/api/movies/${editingMovie._id}` : "/api/movies/bulk"; // fallback to bulk
      const method = editingMovie ? "PUT" : "POST";
      // If creating single movie and backend expects single movie, prefer POST /api/movies — I can add that route.
      // For now, if creating single, send as array to /bulk
      const body = editingMovie ? payload : [payload];
      const res = await fetch(url, { method, headers: { "Content-Type":"application/json", Authorization: token ? `Bearer ${token}` : "" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Failed");
      navigate("/admin/movies");
    } catch (err) {
      alert("Save failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{editingMovie ? "Edit Movie" : "Add Movie"}</h2>

      <form onSubmit={handleSubmit} className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded ${theme==='dark'?'bg-gray-800':'bg-white'}`}>
        <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" className="p-2 rounded border" required />
        <input value={form.year} onChange={e=>setForm({...form, year:e.target.value})} placeholder="Year" className="p-2 rounded border" required />
        <input value={form.genre} onChange={e=>setForm({...form, genre:e.target.value})} placeholder="Genres (comma)" className="p-2 rounded border" />
        <input value={form.duration} onChange={e=>setForm({...form, duration:e.target.value})} placeholder="Duration (min)" className="p-2 rounded border" />
        <input value={form.director} onChange={e=>setForm({...form, director:e.target.value})} placeholder="Director" className="p-2 rounded border" />
        <input value={form.language} onChange={e=>setForm({...form, language:e.target.value})} placeholder="Language" className="p-2 rounded border" />
        <input value={form.image} onChange={e=>setForm({...form, image:e.target.value})} placeholder="Poster URL" className="p-2 rounded border col-span-full" />
        <input value={form.trailerUrl} onChange={e=>setForm({...form, trailerUrl:e.target.value})} placeholder="Trailer embed URL" className="p-2 rounded border col-span-full" />
        <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="p-2 rounded border col-span-full" rows={4} />
        <input value={form.rating} onChange={e=>setForm({...form, rating:e.target.value})} placeholder="Rating (ex: 7.5)" className="p-2 rounded border" />

        <div className="col-span-full flex gap-2 mt-2">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
          <button type="button" onClick={()=>navigate("/admin/movies")} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
