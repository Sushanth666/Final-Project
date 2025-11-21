import React, { useEffect, useState, useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";

export default function AdminReviews() {
  const { theme } = useContext(ThemeContext);
  const { token: ctxToken } = useContext(AuthContext) || {};
  const token = ctxToken || localStorage.getItem("token");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // naive load: fetch all movies and collect reviews
    fetch("/api/movies?page=1&limit=1000", { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(r => r.json())
      .then(movies => {
        const all = [];
        (movies || []).forEach(m => {
          (m.reviews || []).forEach(rv => all.push({ ...rv, movieTitle: m.title, movieId: m._id }));
        });
        setReviews(all);
      })
      .catch(err => console.error(err));
  }, [token]);

  const deleteReview = async (movieId, reviewId) => {
    if (!confirm("Delete review?")) return;
    // Backend needs: DELETE /api/movies/:movieId/reviews/:reviewId
    const res = await fetch(`/api/movies/${movieId}/reviews/${reviewId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` }});
    if (res.ok) setReviews(prev => prev.filter(r => r._id !== reviewId));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reviews Moderation</h2>
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r._id} className={`p-3 rounded ${theme==='dark'?'bg-gray-800':'bg-white'} shadow`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{r.userName} — <span className="text-sm text-gray-400">{r.movieTitle}</span></div>
                <div className="text-sm italic mt-2">{r.comment}</div>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold">⭐ {r.rating}</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => deleteReview(r.movieId, r._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {reviews.length===0 && <p className="text-sm text-gray-500">No reviews found.</p>}
      </div>
    </div>
  );
}
