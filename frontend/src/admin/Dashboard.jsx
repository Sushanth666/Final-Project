import React, { useEffect, useState, useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";

function fetcher(url, token) {
  return fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  }).then(r => r.json());
}

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const { token: ctxToken } = useContext(AuthContext) || {};
  const token = ctxToken || localStorage.getItem("token");

  const [totals, setTotals] = useState({ movies: 0, users: 0, reviews: 0 });
  const [ratings, setRatings] = useState([]); // e.g., [ { label: '10', count: 2 }, ... ]

  useEffect(() => {
    async function load() {
      try {
        // Movies count
        const movies = await fetcher("/api/movies?page=1&limit=1", token);
        // The endpoint returns array; we get total by separate count or approximate here
        // For precise counts you may add /api/admin/stats endpoint in backend
        const users = await fetcher("/api/admin/users", token).catch(() => []);
        // Build simple stats locally from movies array (quick)
        const allMovies = await fetcher("/api/movies?page=1&limit=1000", token).catch(() => []);
        let totalReviews = 0;
        const ratingMap = {};
        (allMovies || []).forEach(m => {
          if (Array.isArray(m.reviews)) {
            totalReviews += m.reviews.length;
            m.reviews.forEach(r => {
              const key = `${r.rating}`;
              ratingMap[key] = (ratingMap[key] || 0) + 1;
            });
          }
        });

        setTotals({ movies: (allMovies || []).length, users: (users || []).length, reviews: totalReviews });
        setRatings(Object.keys(ratingMap).sort((a,b)=>b-a).map(k=>({ label:k, count: ratingMap[k] })));
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg ${theme==='dark'?'bg-gray-800':'bg-white'} shadow`}>
          <p className="text-sm text-gray-400">Total Movies</p>
          <p className="text-2xl font-bold">{totals.movies}</p>
        </div>
        <div className={`p-4 rounded-lg ${theme==='dark'?'bg-gray-800':'bg-white'} shadow`}>
          <p className="text-sm text-gray-400">Total Users</p>
          <p className="text-2xl font-bold">{totals.users}</p>
        </div>
        <div className={`p-4 rounded-lg ${theme==='dark'?'bg-gray-800':'bg-white'} shadow`}>
          <p className="text-sm text-gray-400">Total Reviews</p>
          <p className="text-2xl font-bold">{totals.reviews}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Ratings distribution</h3>
      <div className="space-y-2">
        {ratings.length===0 ? <p className="text-sm text-gray-500">No ratings data yet.</p> : ratings.map(r => (
          <div key={r.label} className="flex items-center gap-3">
            <div className="w-12 text-sm">{r.label}/10</div>
            <div className="flex-1 bg-gray-200 rounded h-3 overflow-hidden">
              <div style={{ width: `${Math.min(100, r.count * 10)}%` }} className="h-full bg-indigo-600" />
            </div>
            <div className="w-12 text-right text-sm">{r.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
