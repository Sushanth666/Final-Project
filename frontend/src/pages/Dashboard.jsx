// import React, { useContext, useEffect, useState, useRef } from "react";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import { loadJSON, saveJSON } from "../utils/storage";
// import { Link, useNavigate } from "react-router-dom";
// import { movies } from "../data/movies";

// export default function Dashboard() {
//   const { user, updateUser } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   // Reviews state
//   const [allReviews, setAllReviews] = useState([]);
//   const [myReviews, setMyReviews] = useState([]);
//   const [page, setPage] = useState(1);
//   const pageSize = 4;

//   // Favorites state
//   const [favorites, setFavorites] = useState([]); // array of movie ids

//   // Profile edit
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [newName, setNewName] = useState("");
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const fileRef = useRef(null);

//   // Password change
//   const [editingPassword, setEditingPassword] = useState(false);
//   const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

//   // UI helpers (theme aware)
//   const bg = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
//   const cardBg = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
//   const border = theme === "dark" ? "border-gray-700" : "border-gray-200";
//   const subText = theme === "dark" ? "text-gray-400" : "text-gray-600";

//   // Load from localStorage when user changes
//   useEffect(() => {
//     if (!user?.email) {
//       setMyReviews([]);
//       setAllReviews([]);
//       setFavorites(loadJSON("mra_favorites", []));
//       return;
//     }

//     // reviews
//     let all = loadJSON("mra_reviews", []);
//     const username = user.name || user.username || "User";

//     // ensure review userName is updated
//     const updatedAll = all.map((r) =>
//       r.userId === user.email && (!r.userName || r.userName === "User")
//         ? { ...r, userName: username }
//         : r
//     );
//     if (JSON.stringify(updatedAll) !== JSON.stringify(all)) {
//       saveJSON("mra_reviews", updatedAll);
//       all = updatedAll;
//     }

//     const filtered = all
//       .filter((r) => r.userId === user.email)
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     setAllReviews(all);
//     setMyReviews(filtered);
//     setPage(1);

//     // favorites
//     setFavorites(loadJSON("mra_favorites", []));
//   }, [user]);

//   // Pagination derived
//   const totalPages = Math.max(1, Math.ceil(myReviews.length / pageSize));
//   const paginated = myReviews.slice((page - 1) * pageSize, page * pageSize);

//   // Stats
//   const totalReviews = myReviews.length;
//   const avgRating =
//     totalReviews === 0
//       ? 0
//       : (myReviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) / totalReviews).toFixed(1);

//   const genreCount = {};
//   myReviews.forEach((r) => {
//     const m = movies.find((mm) => mm.id === r.movieId);
//     (m?.genre || []).forEach((g) => (genreCount[g] = (genreCount[g] || 0) + 1));
//   });
//   const mostReviewedGenre =
//     Object.keys(genreCount).length === 0
//       ? "N/A"
//       : Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0][0];

//   // Rating distribution 10..1
//   const ratingDist = Array.from({ length: 10 }).map((_, i) => {
//     const star = 10 - i;
//     const count = myReviews.filter((r) => Number(r.rating) === star).length;
//     return { star, count };
//   });

//   // --- Exports (CSV & PDF via browser print) ---
//   const exportCSV = () => {
//     if (!myReviews.length) {
//       const blob = new Blob([""], { type: "text/csv" });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "my_reviews.csv";
//       a.click();
//       URL.revokeObjectURL(url);
//       return;
//     }
//     const rows = myReviews.map((r) => {
//       const m = movies.find((mm) => mm.id === r.movieId) || {};
//       return {
//         Movie: m.title || r.movieId,
//         Rating: r.rating,
//         Comment: (r.comment || "").replace(/\n/g, " "),
//         Date: new Date(r.createdAt).toLocaleString(),
//       };
//     });
//     const keys = Object.keys(rows[0]);
//     const csv = [
//       keys.join(","),
//       ...rows.map((row) =>
//         keys
//           .map((k) => `"${String(row[k] ?? "").replace(/"/g, '""')}"`)
//           .join(",")
//       ),
//     ].join("\r\n");

//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `reviews_${user.email || "me"}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const exportPDF = () => {
//     const moviesMap = Object.fromEntries(movies.map((m) => [m.id, m]));
//     const items = myReviews
//       .map((r) => {
//         const m = moviesMap[r.movieId] || {};
//         return `
//           <div style="margin-bottom:12px;padding:8px;border-left:4px solid #4f46e5;">
//             <div style="font-weight:700">${m.title || "Unknown"} — ${r.rating}/10</div>
//             <div style="font-size:12px;color:#666">${new Date(r.createdAt).toLocaleString()}</div>
//             <div style="margin-top:6px;font-style:italic">"${(r.comment || "").replace(/</g, "&lt;")}"</div>
//           </div>
//         `;
//       })
//       .join("");

//     const html = `
//       <html>
//         <head>
//           <title>${user.name || user.email} — Reviews</title>
//           <meta name="viewport" content="width=device-width,initial-scale=1" />
//         </head>
//         <body style="font-family: Arial, Helvetica, sans-serif; padding:18px; color:#111;">
//           <h1 style="margin-bottom:4px">${user.name || user.email} — Reviews</h1>
//           <div style="margin-bottom:8px">Total: ${myReviews.length} — Avg: ${avgRating}</div>
//           <hr/>
//           ${items}
//         </body>
//       </html>
//     `;

//     const blob = new Blob([html], { type: "text/html" });
//     const url = URL.createObjectURL(blob);
//     const w = window.open(url, "_blank");
//     if (!w) {
//       alert("Popup blocked. Allow popups to download PDF.");
//       return;
//     }
//     setTimeout(() => w.print(), 400);
//   };

//   // --- Favorites handlers ---
//   const openMovie = (id) => {
//     navigate(`/movie/${id}`);
//   };

//   const removeFavorite = (movieId) => {
//     if (!window.confirm("Remove this favorite?")) return;
//     const favs = loadJSON("mra_favorites", []);
//     const updated = favs.filter((f) => f !== movieId);
//     saveJSON("mra_favorites", updated);
//     setFavorites(updated);
//   };

//   const clearAllFavorites = () => {
//     if (!favorites.length) return;
//     if (!window.confirm("Clear all favorites? This cannot be undone.")) return;
//     saveJSON("mra_favorites", []);
//     setFavorites([]);
//   };

//   // --- Profile edit handlers ---
//   const onPickFile = (file) => {
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (e) => setPhotoPreview(e.target.result);
//     reader.readAsDataURL(file);
//   };

//   const saveProfile = () => {
//     const users = loadJSON("mra_users", []);
//     const idx = users.findIndex((u) => u.email === user.email);
//     const updated = [...users];
//     if (idx !== -1) {
//       if (newName && newName.trim()) updated[idx].name = newName.trim();
//       if (photoPreview) updated[idx].photo = photoPreview;
//     } else {
//       updated.push({
//         id: Date.now().toString(),
//         email: user.email,
//         name: newName || user.name,
//         photo: photoPreview || user.photo || null,
//         password: "",
//       });
//     }
//     saveJSON("mra_users", updated);

//     if (typeof updateUser === "function") {
//       updateUser({
//         ...user,
//         name: newName && newName.trim() ? newName.trim() : user.name,
//         photo: photoPreview || user.photo,
//       });
//     }

//     // update reviews userName if changed
//     if (newName && newName.trim()) {
//       const all = loadJSON("mra_reviews", []).map((r) =>
//         r.userId === user.email ? { ...r, userName: newName.trim() } : r
//       );
//       saveJSON("mra_reviews", all);
//       setAllReviews(all);
//       setMyReviews(all.filter((r) => r.userId === user.email));
//     }

//     setEditingProfile(false);
//     setNewName("");
//     setPhotoPreview(null);
//     alert("Profile updated locally.");
//   };

//   const changePassword = () => {
//     const users = loadJSON("mra_users", []);
//     const idx = users.findIndex((u) => u.email === user.email);
//     if (idx === -1) return alert("User not found in local storage.");
//     if (users[idx].password !== passwords.current) return alert("Current password incorrect.");
//     if (!passwords.next || passwords.next !== passwords.confirm) return alert("New passwords do not match.");
//     users[idx].password = passwords.next;
//     saveJSON("mra_users", users);
//     setEditingPassword(false);
//     setPasswords({ current: "", next: "", confirm: "" });
//     alert("Password updated locally.");
//   };

//   // --- Review actions ---
//   const editReview = (review) => {
//     navigate(`/movie/${review.movieId}`, { state: { editReview: review } });
//   };

//   const deleteReview = (id) => {
//     if (!window.confirm("Delete this review?")) return;
//     const updated = loadJSON("mra_reviews", []).filter((r) => r.id !== id);
//     saveJSON("mra_reviews", updated);
//     setAllReviews(updated);
//     setMyReviews(updated.filter((r) => r.userId === user.email));
//     alert("Deleted review.");
//   };

//   // Simple minimal bar for charts
//   const Bar = ({ label, value, max }) => {
//     const pct = max === 0 ? 0 : Math.round((value / max) * 100);
//     return (
//       <div className="flex items-center gap-3">
//         <div className="w-28 text-sm text-gray-500">{label}</div>
//         <div className="flex-1 bg-gray-200 rounded overflow-hidden h-4">
//           <div style={{ width: `${pct}%` }} className="h-4 bg-indigo-600" />
//         </div>
//         <div className="w-10 text-sm text-right">{value}</div>
//       </div>
//     );
//   };

//   // --- Render ---
//   return (
//     <div className={`min-h-screen ${bg} p-8`}>
//       <div className={`max-w-4xl mx-auto ${cardBg} border ${border} rounded-2xl p-8 shadow-xl`}>

//         {/* Header */}
//         <div className="flex items-center gap-4 mb-6 border-b pb-4" style={{ borderColor: theme === "dark" ? "#2b2b2b" : "#e8e8e8" }}>
//           <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold overflow-hidden">
//             {user?.photo ? <img src={user.photo} alt="avatar" className="w-full h-full object-cover" /> : <span>{(user?.name || user?.email || "U")[0].toUpperCase()}</span>}
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold">{user?.name || user?.email}</h1>
//             <p className={subText}>{user?.email}</p>
//           </div>

//           <div className="ml-auto flex items-center gap-3">
//             <button onClick={exportCSV} className="px-3 py-2 rounded bg-indigo-600 text-white">Download CSV</button>
//             <button onClick={exportPDF} className="px-3 py-2 rounded bg-green-600 text-white">Download PDF</button>
//             <button onClick={() => setEditingProfile(true)} className="px-3 py-2 rounded bg-gray-700 text-white">Edit Profile</button>
//           </div>
//         </div>

//         {/* FAVORITES SECTION (compact list) */}
//         <div className={`mb-6 p-4 rounded-xl border ${border} ${cardBg}`}>
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-xl font-bold">Favorites</h2>
//             <div className="flex items-center gap-2">
//               {favorites.length > 0 && (
//                 <button onClick={clearAllFavorites} className="px-3 py-1 rounded bg-rose-500 text-white">Clear All Favorites</button>
//               )}
//             </div>
//           </div>

//           {favorites.length === 0 ? (
//             <div className={`py-6 text-center ${subText}`}>
//               No favorites yet. <Link to="/home" className="text-indigo-500 hover:underline">Browse movies</Link>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {favorites.map((mid) => {
//                 const m = movies.find((x) => x.id === mid);
//                 if (!m) return null;
//                 return (
//                   <div key={mid} className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100/30 ${theme === "dark" ? "hover:bg-white/5" : ""}`}>
//                     <img src={m.image} alt={m.title} className="w-16 h-20 object-cover rounded" style={{ cursor: "pointer" }} onClick={() => openMovie(m.id)} />
//                     <div className="flex-1">
//                       <div className="font-semibold cursor-pointer hover:text-indigo-500" onClick={() => openMovie(m.id)}>{m.title}</div>
//                       <div className="text-sm text-gray-500">{m.genre?.slice(0, 2).join(", ")}</div>
//                     </div>
//                     <div className="text-yellow-400 font-bold mr-2">⭐ {m.rating || m.avgRating || "—"}</div>
//                     <button onClick={() => removeFavorite(mid)} className="px-3 py-1 rounded bg-gray-700 text-white">Remove</button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* STATS & CHARTS */}
//         <div className="grid md:grid-cols-3 gap-4 mb-6">
//           <div className="p-3 rounded-xl bg-indigo-600 text-white">
//             <div className="text-sm opacity-90">Total Reviews</div>
//             <div className="text-2xl font-bold">{totalReviews}</div>
//           </div>
//           <div className="p-3 rounded-xl bg-yellow-400 text-black">
//             <div className="text-sm opacity-90">Average Rating</div>
//             <div className="text-2xl font-bold">{avgRating}</div>
//           </div>
//           <div className="p-3 rounded-xl bg-rose-500 text-white">
//             <div className="text-sm opacity-90">Most Reviewed Genre</div>
//             <div className="text-2xl font-bold">{mostReviewedGenre}</div>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6 mb-6">
//           <div className={`p-4 rounded-xl border ${border}`}>
//             <h3 className="font-semibold mb-3">Rating Distribution</h3>
//             <div className="space-y-2">
//               {(() => {
//                 const max = Math.max(...ratingDist.map((r) => r.count), 1);
//                 return ratingDist.map((r) => <Bar key={r.star} label={`${r.star}/10`} value={r.count} max={max} />);
//               })()}
//             </div>
//           </div>

//           <div className={`p-4 rounded-xl border ${border}`}>
//             <h3 className="font-semibold mb-3">Genres</h3>
//             <div className="space-y-2">
//               {(() => {
//                 const entries = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
//                 if (!entries.length) return <div className={subText}>No genre data</div>;
//                 const max = Math.max(...entries.map((e) => e[1]), 1);
//                 return entries.map(([g, c]) => <Bar key={g} label={g} value={c} max={max} />);
//               })()}
//             </div>
//           </div>
//         </div>

//         {/* REVIEWS LIST */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

//           {myReviews.length === 0 ? (
//             <div className={`p-8 border-2 border-dashed rounded-xl ${border} ${subText} text-center`}>
//               <div className="text-2xl mb-2">No reviews yet</div>
//               <Link to="/home" className="text-indigo-500">Browse Movies →</Link>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {paginated.map((r) => {
//                 const m = movies.find((mm) => mm.id === r.movieId) || {};
//                 return (
//                   <div key={r.id} className={`flex gap-4 items-start p-4 rounded-xl border ${border} ${cardBg}`}>
//                     <img src={m.image} alt={m.title} className="w-28 h-40 object-cover rounded-lg shadow" />
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <div className="text-xl font-semibold cursor-pointer hover:text-indigo-500" onClick={() => navigate(`/movie/${m.id}`)}>{m.title}</div>
//                           <div className={`${subText} text-sm`}>{new Date(r.createdAt).toLocaleDateString()}</div>
//                         </div>
//                         <div className="text-yellow-400 font-bold">⭐ {r.rating}/10</div>
//                       </div>

//                       <p className="mt-3 italic border-l-4 pl-4 border-indigo-400">“{r.comment}”</p>

//                       <div className="mt-3 flex gap-3">
//                         <button onClick={() => editReview(r)} className="px-3 py-1 rounded bg-indigo-600 text-white">Edit</button>
//                         <button onClick={() => deleteReview(r.id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* PAGINATION */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-3 mt-6">
//             <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
//               className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40">Prev</button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button key={i} onClick={() => setPage(i + 1)}
//                 className={`px-3 py-1 rounded-lg ${page === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"}`}>
//                 {i + 1}
//               </button>
//             ))}

//             <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40">Next</button>
//           </div>
//         )}

//         {/* Profile edit modal */}
//         {editingProfile && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
//             <div className="absolute inset-0 bg-black/50" onClick={() => setEditingProfile(false)}></div>
//             <div className={`relative max-w-lg w-full p-6 rounded-2xl ${cardBg} border ${border}`}>
//               <h3 className="text-xl font-bold mb-3">Edit Profile</h3>

//               <label className="block text-sm mb-1">Display name</label>
//               <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Your name"
//                 className="w-full p-2 rounded mb-3 border" />

//               <label className="block text-sm mb-1">Profile photo</label>
//               <input ref={fileRef} type="file" accept="image/*" onChange={(e) => onPickFile(e.target.files?.[0])} className="mb-3" />
//               {photoPreview && <img src={photoPreview} alt="preview" className="w-28 h-28 object-cover rounded mb-3" />}

//               <div className="flex gap-3 mt-4">
//                 <button onClick={saveProfile} className="px-4 py-2 rounded bg-indigo-600 text-white">Save</button>
//                 <button onClick={() => { setEditingProfile(false); setPhotoPreview(null); setNewName(""); }} className="px-4 py-2 rounded bg-gray-600 text-white">Cancel</button>
//                 <button onClick={() => { setEditingPassword(true); setEditingProfile(false); }} className="ml-auto px-3 py-2 rounded bg-rose-500 text-white">Change password</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Password modal */}
//         {editingPassword && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
//             <div className="absolute inset-0 bg-black/50" onClick={() => setEditingPassword(false)}></div>
//             <div className={`relative max-w-md w-full p-6 rounded-2xl ${cardBg} border ${border}`}>
//               <h3 className="text-xl font-bold mb-3">Change Password</h3>

//               <label className="block text-sm mb-1">Current password</label>
//               <input value={passwords.current} type="password" onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))} className="w-full p-2 rounded mb-3 border" />

//               <label className="block text-sm mb-1">New password</label>
//               <input value={passwords.next} type="password" onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))} className="w-full p-2 rounded mb-3 border" />

//               <label className="block text-sm mb-1">Confirm new</label>
//               <input value={passwords.confirm} type="password" onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} className="w-full p-2 rounded mb-3 border" />

//               <div className="flex gap-3 mt-4">
//                 <button onClick={changePassword} className="px-4 py-2 rounded bg-rose-500 text-white">Change</button>
//                 <button onClick={() => setEditingPassword(false)} className="px-4 py-2 rounded bg-gray-600 text-white">Cancel</button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import React, { useContext, useEffect, useState, useRef } from "react";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import API from "../api/api";
// import { Link, useNavigate } from "react-router-dom";
// import { loadJSON, saveJSON } from "../utils/storage";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   const [myReviews, setMyReviews] = useState([]);
//   const [movieMap, setMovieMap] = useState({});
//   const [favorites, setFavorites] = useState([]);
//   const [page, setPage] = useState(1);
//   const pageSize = 4;

//   // profile ui
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [newName, setNewName] = useState("");
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const fileRef = useRef(null);

//   const [editingPassword, setEditingPassword] = useState(false);
//   const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

//   const bg = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
//   const cardBg = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
//   const border = theme === "dark" ? "border-gray-700" : "border-gray-200";
//   const subText = theme === "dark" ? "text-gray-400" : "text-gray-600";

//   // -----------------------------------------
//   // LOAD MOVIES + REVIEWS + FAVORITES
//   // -----------------------------------------
//   useEffect(() => {
//     if (!user) return;

//     async function loadData() {
//       try {
//         // 1. Load movies
//         const moviesRes = await API.get("/api/movies");
//         const map = {};
//         moviesRes.data.forEach((m) => (map[m._id] = m));
//         setMovieMap(map);

//         // 2. Load my reviews
//         const reviewsRes = await API.get("/api/reviews/me");
//         setMyReviews(reviewsRes.data);
//         setPage(1);

//         // 3. Load favorite IDs from localStorage
        

//         // 4. Convert IDs → movie objects
//         const favMovies = favIds.map((id) => map[id]).filter(Boolean);
//         setFavorites(favMovies);
//       } catch (err) {
//         console.log("DASHBOARD LOAD ERROR:", err);
//       }
//     }

//     loadData();
//   }, [user]);

//   // -----------------------------------------
//   // PAGINATION
//   // -----------------------------------------
//   const totalPages = Math.max(1, Math.ceil(myReviews.length / pageSize));
//   const paginated = myReviews.slice((page - 1) * pageSize, page * pageSize);

//   // -----------------------------------------
//   // STATS
//   // -----------------------------------------
//   const totalReviews = myReviews.length;

//   const avgRating =
//     totalReviews === 0
//       ? 0
//       : (
//           myReviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
//           totalReviews
//         ).toFixed(1);

//   const genreCount = {};
//   myReviews.forEach((r) => {
//     const m = movieMap[r.movieId];
//     if (m?.genre) m.genre.forEach((g) => (genreCount[g] = (genreCount[g] || 0) + 1));
//   });

//   const mostReviewedGenre =
//     Object.keys(genreCount).length === 0
//       ? "N/A"
//       : Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0][0];

//   const ratingDist = Array.from({ length: 10 }).map((_, i) => {
//     const star = 10 - i;
//     const count = myReviews.filter((r) => Number(r.rating) === star).length;
//     return { star, count };
//   });

//   // -----------------------------------------
//   // FAVORITES
//   // -----------------------------------------
//   const openMovie = (id) => navigate(`/movie/${id}`);

//   const removeFavorite = (movieId) => {
//     const updated = favorites.filter((m) => m._id !== movieId);

//     // save only IDs back to localStorage
//     saveJSON(
//       "mra_favorites",
//       updated.map((m) => m._id)
//     );

//     setFavorites(updated);
//   };

//   const clearAllFavorites = () => {
//     saveJSON("mra_favorites", []);
//     setFavorites([]);
//   };

//   // -----------------------------------------
//   // REVIEW ACTIONS
//   // -----------------------------------------
//   const editReview = (review) => {
//     navigate(`/movie/${review.movieId}`, { state: { editReview: review } });
//   };

//   const deleteReview = async (id) => {
//     if (!window.confirm("Delete review?")) return;

//     await API.delete(`/api/reviews/${id}`);
//     setMyReviews((prev) => prev.filter((r) => r._id !== id));
//   };

//   // -----------------------------------------
//   // EXPORT
//   // -----------------------------------------
//   const exportCSV = () => {
//     if (!myReviews.length) return;

//     const rows = myReviews.map((r) => {
//       const m = movieMap[r.movieId] || {};
//       return {
//         Movie: m.title || "Unknown",
//         Rating: r.rating,
//         Comment: String(r.comment || "").replace(/\n/g, " "),
//         Date: new Date(r.createdAt).toLocaleString(),
//       };
//     });

//     const keys = Object.keys(rows[0]);
//     const csv = [
//       keys.join(","),
//       ...rows.map((row) =>
//         keys.map((k) => `"${String(row[k] || "").replace(/"/g, '""')}"`).join(",")
//       ),
//     ].join("\r\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "reviews.csv";
//     a.click();
//   };

//   const exportPDF = () => {
//     const items = myReviews
//       .map((r) => {
//         const m = movieMap[r.movieId] || {};
//         return `
//           <div style="padding:8px;border-left:4px solid #4f46e5;margin-bottom:12px">
//             <div style="font-weight:700">${m.title || "Unknown"} — ${r.rating}/10</div>
//             <div style="font-size:12px;color:#666">${new Date(
//               r.createdAt
//             ).toLocaleString()}</div>
//             <div style="margin-top:6px;font-style:italic">"${String(
//               r.comment || ""
//             ).replace(/</g, "&lt;")}"</div>
//           </div>
//         `;
//       })
//       .join("");

//     const html = `
//       <html>
//         <body style="font-family:Arial;padding:20px">
//           <h1>${user?.name || user?.email}</h1>
//           <p>Total Reviews: ${myReviews.length} | Avg Rating: ${avgRating}</p>
//           <hr/>
//           ${items}
//         </body>
//       </html>
//     `;
//     const blob = new Blob([html], { type: "text/html" });
//     const w = window.open(URL.createObjectURL(blob), "_blank");
//     setTimeout(() => w.print(), 300);
//   };

//   // -----------------------------------------
//   // BAR COMPONENT
//   // -----------------------------------------
//   const Bar = ({ label, value, max }) => {
//     const pct = max === 0 ? 0 : Math.round((value / max) * 100);
//     return (
//       <div className="flex items-center gap-3">
//         <div className="w-28 text-sm text-gray-500">{label}</div>
//         <div className="flex-1 bg-gray-200 h-4 rounded overflow-hidden">
//           <div style={{ width: `${pct}%` }} className="h-4 bg-indigo-600"></div>
//         </div>
//         <div className="w-10 text-sm text-right">{value}</div>
//       </div>
//     );
//   };

//   // -----------------------------------------
//   // RENDER
//   // -----------------------------------------
//   return (
//     <div className={`min-h-screen ${bg} p-8`}>
//       <div className={`max-w-4xl mx-auto ${cardBg} border ${border} p-8 rounded-2xl`}>

//         {/* HEADER */}
//         <div className="flex items-center gap-4 mb-6 border-b pb-4">
//           <div className="w-14 h-14 rounded-full bg-indigo-600 text-white text-2xl flex items-center justify-center overflow-hidden">
//             {user?.photo ? (
//               <img src={user.photo} className="w-full h-full object-cover" />
//             ) : (
//               user?.name?.[0] || "U"
//             )}
//           </div>

//           <div>
//             <h1 className="text-3xl font-bold">{user?.name || user?.email}</h1>
//             <p className={subText}>{user?.email}</p>
//           </div>

//           <div className="ml-auto flex gap-2">
//             <button onClick={exportCSV} className="px-3 py-2 bg-indigo-600 text-white rounded">
//               CSV
//             </button>
//             <button onClick={exportPDF} className="px-3 py-2 bg-green-600 text-white rounded">
//               PDF
//             </button>
//           </div>
//         </div>

//         {/* FAVORITES */}
//         {/* <div className={`p-4 rounded-xl border ${border} mb-6`}>
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-bold">Favorites</h2>

//             {favorites.length > 0 && (
//               <button
//                 onClick={clearAllFavorites}
//                 className="px-3 py-1 bg-rose-500 text-white rounded"
//               >
//                 Clear All
//               </button>
//             )}
//           </div>

//           {favorites.length === 0 ? (
//             <p className={`text-center py-6 ${subText}`}>No favorites found.</p>
//           ) : (
//             <div className="space-y-3 mt-3">
//               {favorites.map((m) => (
//                 <div
//                   key={m._id}
//                   className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
//                 >
//                   <img
//                     src={m.image}
//                     className="w-16 h-20 object-cover rounded"
//                     onClick={() => openMovie(m._id)}
//                   />

//                   <div className="flex-1">
//                     <div
//                       className="font-semibold hover:text-indigo-600"
//                       onClick={() => openMovie(m._id)}
//                     >
//                       {m.title}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {m.genre?.join(", ")}
//                     </div>
//                   </div>

//                   <button
//                     className="px-2 py-1 bg-gray-700 text-white rounded"
//                     onClick={() => removeFavorite(m._id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div> */}

//         {/* STATS */}
//         <div className="grid md:grid-cols-3 gap-4 mb-6">
//           <div className="p-3 rounded-xl bg-indigo-600 text-white">
//             <div>Total Reviews</div>
//             <div className="text-2xl font-bold">{totalReviews}</div>
//           </div>
//           <div className="p-3 rounded-xl bg-yellow-400 text-black">
//             <div>Average Rating</div>
//             <div className="text-2xl font-bold">{avgRating}</div>
//           </div>
//           <div className="p-3 rounded-xl bg-rose-500 text-white">
//             <div>Top Genre</div>
//             <div className="text-2xl font-bold">{mostReviewedGenre}</div>
//           </div>
//         </div>

//         {/* CHARTS */}
//         <div className="grid md:grid-cols-2 gap-6 mb-6">
//           <div className={`p-4 rounded-xl border ${border}`}>
//             <h3 className="font-semibold mb-3">Rating Distribution</h3>
//             {(() => {
//               const max = Math.max(...ratingDist.map((r) => r.count), 1);
//               return ratingDist.map((r) => (
//                 <Bar key={r.star} label={`${r.star}/10`} value={r.count} max={max} />
//               ));
//             })()}
//           </div>

//           <div className={`p-4 rounded-xl border ${border}`}>
//             <h3 className="font-semibold mb-3">Genres</h3>
//             {(() => {
//               const entries = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
//               if (!entries.length) return <p>No genre data</p>;
//               const max = Math.max(...entries.map((e) => e[1]), 1);

//               return entries.map(([g, c]) => (
//                 <Bar key={g} label={g} value={c} max={max} />
//               ));
//             })()}
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

//           {myReviews.length === 0 ? (
//             <div className={`p-8 border border-dashed rounded-xl ${border} text-center ${subText}`}>
//               <div className="text-2xl mb-2">No reviews yet</div>
//               <Link to="/home" className="text-indigo-500">
//                 Browse Movies →
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {paginated.map((r) => {
//                 const m = movieMap[r.movieId];
//                 if (!m) return null;

//                 return (
//                   <div
//                     key={r._id}
//                     className={`p-4 border ${border} rounded-xl flex gap-4 ${cardBg}`}
//                   >
//                     <img src={m.image} className="w-28 h-40 object-cover rounded-lg" />

//                     <div className="flex-1">
//                       <div className="flex justify-between">
//                         <div>
//                           <div
//                             className="text-xl font-semibold cursor-pointer hover:text-indigo-600"
//                             onClick={() => navigate(`/movie/${m._id}`)}
//                           >
//                             {m.title}
//                           </div>
//                           <div className={subText}>
//                             {new Date(r.createdAt).toLocaleDateString()}
//                           </div>
//                         </div>

//                         <div className="text-yellow-400 font-bold">
//                           ⭐ {r.rating}/10
//                         </div>
//                       </div>

//                       <p className="mt-3 italic border-l-4 pl-4 border-indigo-400">
//                         “{r.comment}”
//                       </p>

//                       <div className="mt-3 flex gap-3">
//                         <button
//                           className="px-3 py-1 bg-indigo-600 text-white rounded"
//                           onClick={() => editReview(r)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="px-3 py-1 bg-red-600 text-white rounded"
//                           onClick={() => deleteReview(r._id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* PAGINATION */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-3 mt-6">
//             <button
//               className="px-4 py-2 bg-gray-700 text-white rounded"
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//             >
//               Prev
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 className={`px-3 py-1 rounded ${
//                   page === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"
//                 }`}
//                 onClick={() => setPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               className="px-4 py-2 bg-gray-700 text-white rounded"
//               disabled={page === totalPages}
//               onClick={() => setPage(page + 1)}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useContext, useEffect, useState } from "react";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import API from "../api/api";
// import { Link, useNavigate } from "react-router-dom";
// import { loadJSON, saveJSON } from "../utils/storage";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   const [myReviews, setMyReviews] = useState([]);
//   const [movieMap, setMovieMap] = useState({});
//   const [favorites, setFavorites] = useState([]);

//   const bg = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
//   const cardBg = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
//   const border = theme === "dark" ? "border-gray-700" : "border-gray-300";
//   const subtle = theme === "dark" ? "text-gray-400" : "text-gray-600";

//   // LOAD DATA
//   useEffect(() => {
//     if (!user) return;

//     async function loadAll() {
//       try {
//         const moviesRes = await API.get("/api/movies");
//         const map = {};
//         moviesRes.data.forEach((m) => (map[m._id] = m));
//         setMovieMap(map);

//         const reviewsRes = await API.get("/api/reviews/me");
//         setMyReviews(reviewsRes.data);

//         const favIds = loadJSON("mra_favorites", []);
//         const fav = favIds.map((id) => map[id]).filter(Boolean);
//         setFavorites(fav);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     loadAll();
//   }, [user]);

//   // Remove favorite
//   const removeFav = (id) => {
//     const updated = favorites.filter((m) => m._id !== id);
//     saveJSON("mra_favorites", updated.map((m) => m._id));
//     setFavorites(updated);
//   };

//   // Delete review
//   const deleteReview = async (id) => {
//     if (!window.confirm("Delete this review?")) return;
//     await API.delete(`/api/reviews/${id}`);
//     setMyReviews((prev) => prev.filter((r) => r._id !== id));
//   };

//   // STATS
//   const totalReviews = myReviews.length;
//   const avgRating =
//     totalReviews === 0
//       ? 0
//       : (
//           myReviews.reduce((s, r) => s + Number(r.rating || 0), 0) / totalReviews
//         ).toFixed(1);

//   const genreCount = {};
//   myReviews.forEach((r) => {
//     const m = movieMap[r.movieId];
//     if (m?.genre) m.genre.forEach((g) => (genreCount[g] = (genreCount[g] || 0) + 1));
//   });

//   const topGenre =
//     Object.keys(genreCount).length === 0
//       ? "N/A"
//       : Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0][0];

//   return (
//     <div className={`min-h-screen p-8 ${bg}`}>
//       <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

//         {/* LEFT PROFILE CARD */}
//         <div className={`p-6 rounded-2xl border ${border} ${cardBg}`}>
//           <div className="flex flex-col items-center">
//             <div className="w-28 h-28 rounded-full bg-indigo-600 text-white text-4xl flex items-center justify-center overflow-hidden">
//               {user?.photo ? (
//                 <img src={user.photo} className="w-full h-full object-cover" />
//               ) : (
//                 user?.name?.[0]?.toUpperCase() || "U"
//               )}
//             </div>

//             <h1 className="text-2xl font-bold mt-3 text-center">
//               {user?.name || user?.email}
//             </h1>
//             <p className={`text-sm ${subtle}`}>{user?.email}</p>
//           </div>

//           {/* Stats like IMDb */}
//           <div className="mt-6 space-y-3">
//             <div className="flex justify-between">
//               <span className={subtle}>Total Reviews</span>
//               <span className="font-semibold">{totalReviews}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className={subtle}>Average Rating</span>
//               <span className="font-semibold">{avgRating}</span>
//             </div>

//             {/* <div className="flex justify-between">
//               <span className={subtle}>Top Genre</span>
//               <span className="font-semibold">{topGenre}</span>
//             </div>*/}
            
//           </div>
//         </div> 

//         {/* CENTER SECTION - REVIEWS */}
//         <div className="lg:col-span-2 space-y-8">

//           {/* FAVORITES BLOCK */}
//           <div className={`p-6 rounded-2xl border ${border} ${cardBg}`}>
//             <div className="flex justify-between mb-4">
//               <h2 className="text-xl font-bold">Your Favorites</h2>
//               {favorites.length > 0 && (
//                 <button
//                   className="text-red-500"
//                   onClick={() => {
//                     saveJSON("mra_favorites", []);
//                     setFavorites([]);
//                   }}
//                 >
//                   Clear All
//                 </button>
//               )}
//             </div>

//             {favorites.length === 0 ? (
//               <p className={subtle}>No favorites added.</p>
//             ) : (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {favorites.map((m) => (
//                   <div key={m._id} className="relative group cursor-pointer">
//                     <img
//                       src={m.image}
//                       className="rounded-lg h-48 w-full object-cover"
//                       onClick={() => navigate(`/movie/${m._id}`)}
//                     />
//                     <button
//                       className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
//                       onClick={() => removeFav(m._id)}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* REVIEWS */}
//           <div className={`p-6 rounded-2xl border ${border} ${cardBg}`}>
//             <h2 className="text-xl font-bold mb-4">Your Reviews</h2>

//             {myReviews.length === 0 ? (
//               <p className={subtle}>You haven't reviewed anything yet.</p>
//             ) : (
//               <div className="space-y-6">
//                 {myReviews.map((r) => {
//                   const m = movieMap[r.movieId];
//                   if (!m) return null;

//                   return (
//                     <div
//                       key={r._id}
//                       className="flex gap-4 border-b pb-4 last:border-none"
//                     >
//                       <img
//                         src={m.image}
//                         className="w-24 h-32 rounded-lg object-cover cursor-pointer"
//                         onClick={() => navigate(`/movie/${m._id}`)}
//                       />

//                       <div className="flex-1">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <div
//                               className="font-semibold text-lg cursor-pointer hover:text-indigo-500"
//                               onClick={() => navigate(`/movie/${m._id}`)}
//                             >
//                               {m.title}
//                             </div>
//                             <div className={`text-sm ${subtle}`}>
//                               {new Date(r.createdAt).toLocaleDateString()}
//                             </div>
//                           </div>

//                           <div className="text-yellow-400 font-bold">
//                             ⭐ {r.rating}/10
//                           </div>
//                         </div>

//                         <p className="mt-2 italic">“{r.comment}”</p>

//                         <div className="flex gap-3 mt-3">
//                           <button
//                             className="px-3 py-1 bg-indigo-600 text-white rounded"
//                             onClick={() =>
//                               navigate(`/movie/${m._id}`, {
//                                 state: { editReview: r },
//                               })
//                             }
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="px-3 py-1 bg-red-600 text-white rounded"
//                             onClick={() => deleteReview(r._id)}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useContext, useEffect, useState } from "react";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import API from "../api/api";
// import { Link, useNavigate } from "react-router-dom";
// import { loadJSON, saveJSON } from "../utils/storage";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   const [myReviews, setMyReviews] = useState([]);
//   const [movieMap, setMovieMap] = useState({});
//   const [favorites, setFavorites] = useState([]);

//   const bg = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
//   const cardBg = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
//   const border = theme === "dark" ? "border-gray-700" : "border-gray-300";
//   const subtle = theme === "dark" ? "text-gray-400" : "text-gray-600";

//   // LOAD DATA
//   useEffect(() => {
//     if (!user) return;

//     async function loadAll() {
//       try {
//         // 1. MOVIES
//         const moviesRes = await API.get("/api/movies");
//         // const map = {};
//         // moviesRes.data.forEach((m) => {
//         //   const id = m._id || m.id;
//         //   if (id) map[id] = m;
//         // });
//         // setMovieMap(map);
//         const map = {};
//       moviesRes.data.forEach((m) => {
//         const key = m._id || m.id;
//         if (key) map[key] = m;
//       });
//       setMovieMap(map);

//         // 2. REVIEWS (normalize movieId)
//         const reviewsRes = await API.get("/api/reviews/me");

// const normalized = reviewsRes.data.map((r) => ({
//   ...r,
//   movieId: r.movieId || r.movie || r.movie_id || r.id || r._id,
// }));

// setMyReviews(normalized);

//         // 3. FAVORITES ONLY AFTER MOVIES LOAD
//         const favIds = loadJSON("mra_favorites") || [];
//         const fav = favIds.map((id) => map[id]).filter(Boolean);
//         setFavorites(fav);

//       } catch (err) {
//         console.log("DASHBOARD LOAD ERROR:", err);
//       }
//     }

//     loadAll();
//   }, [user]);

//   // Remove favorite
//   const removeFav = (id) => {
//     const updated = favorites.filter((m) => m._id !== id);
//     saveJSON("mra_favorites", updated.map((m) => m._id));
//     setFavorites(updated);
//   };

//   // Delete review
//   const deleteReview = async (id) => {
//     if (!window.confirm("Delete this review?")) return;
//     await API.delete(`/api/reviews/${id}`);
//     setMyReviews((prev) => prev.filter((r) => r._id !== id));
//   };

//   // STATS
//   const totalReviews = myReviews.length;

//   const avgRating =
//     totalReviews === 0
//       ? 0
//       : (
//           myReviews.reduce((s, r) => s + Number(r.rating || 0), 0) / totalReviews
//         ).toFixed(1);

//   const genreCount = {};
//   myReviews.forEach((r) => {
//     const m = movieMap[r.movieId];
//     if (m?.genre) {
//       m.genre.forEach((g) => {
//         genreCount[g] = (genreCount[g] || 0) + 1;
//       });
//     }
//   });

//   const topGenre =
//     Object.keys(genreCount).length === 0
//       ? "N/A"
//       : Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0][0];

//   return (
//     <div className={`min-h-screen p-8 ${bg}`}>
//       <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

//         {/* LEFT PROFILE CARD */}
//         <div className={`p-6 rounded-2xl border ${border} ${cardBg}`}>
//           <div className="flex flex-col items-center">
//             <div className="w-28 h-28 rounded-full bg-indigo-600 text-white text-4xl flex items-center justify-center overflow-hidden">
//               {user?.photo ? (
//                 <img src={user.photo} className="w-full h-full object-cover" />
//               ) : (
//                 user?.name?.[0]?.toUpperCase() || "U"
//               )}
//             </div>

//             <h1 className="text-2xl font-bold mt-3 text-center">
//               {user?.name || user?.email}
//             </h1>
//             <p className={`text-sm ${subtle}`}>{user?.email}</p>
//           </div>

//           {/* Stats */}
//           <div className="mt-6 space-y-3">
//             <div className="flex justify-between">
//               <span className={subtle}>Total Reviews</span>
//               <span className="font-semibold">{totalReviews}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className={subtle}>Average Rating</span>
//               <span className="font-semibold">{avgRating}</span>
//             </div>
//           </div>
//         </div>

//         {/* CENTER SECTION - REVIEWS + FAVORITES */}
//         <div className="lg:col-span-2 space-y-8">

//           {/* FAVORITES */}
//           <div className={`p-6 rounded-2xl border ${border} ${cardBg}`}>
//             <div className="flex justify-between mb-4">
//               <h2 className="text-xl font-bold">Your Favorites</h2>
//               {favorites.length > 0 && (
//                 <button
//                   className="text-red-500"
//                   onClick={() => {
//                     saveJSON("mra_favorites", []);
//                     setFavorites([]);
//                   }}
//                 >
//                   Clear All
//                 </button>
//               )}
//             </div>

//             {favorites.length === 0 ? (
//               <p className={subtle}>No favorites added.</p>
//             ) : (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {favorites.map((m) => (
//                   <div key={m._id} className="relative group cursor-pointer">
//                     <img
//                       src={m.image}
//                       className="rounded-lg h-48 w-full object-cover"
//                       onClick={() => navigate(`/movie/${m._id}`)}
//                     />
//                     <button
//                       className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
//                       onClick={() => removeFav(m._id)}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* REVIEWS */}
//           <div className={`p-6 rounded-2xl border ${border} ${cardBg}`}>
//             <h2 className="text-xl font-bold mb-4">Your Reviews</h2>

//             {myReviews.length === 0 ? (
//               <p className={subtle}>You haven't reviewed anything yet.</p>
//             ) : (
//               <div className="space-y-6">
//                 {myReviews.map((r) => {
//                   const m = movieMap[r.movieId];
//                   if (!m) return null;

//                   return (
//                     <div
//                       key={r._id}
//                       className="flex gap-4 border-b pb-4 last:border-none"
//                     >
//                       <img
//                         src={m.image}
//                         className="w-24 h-32 rounded-lg object-cover cursor-pointer"
//                         onClick={() => navigate(`/movie/${m._id}`)}
//                       />

//                       <div className="flex-1">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <div
//                               className="font-semibold text-lg cursor-pointer hover:text-indigo-500"
//                               onClick={() => navigate(`/movie/${m._id}`)}
//                             >
//                               {m.title}
//                             </div>
//                             <div className={`text-sm ${subtle}`}>
//                               {new Date(r.createdAt).toLocaleDateString()}
//                             </div>
//                           </div>

//                           <div className="text-yellow-400 font-bold">
//                             ⭐ {r.rating}/10
//                           </div>
//                         </div>

//                         <p className="mt-2 italic">“{r.comment}”</p>

//                         <div className="flex gap-3 mt-3">
//                           <button
//                             className="px-3 py-1 bg-indigo-600 text-white rounded"
//                             onClick={() =>
//                               navigate(`/movie/${m._id}`, {
//                                 state: { editReview: r },
//                               })
//                             }
//                           >
//                             Edit
//                           </button>

//                           <button
//                             className="px-3 py-1 bg-red-600 text-white rounded"
//                             onClick={() => deleteReview(r._id)}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/Dashboard.jsx
// import React, { useContext, useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import API from "../api/api";
// import { loadJSON, saveJSON } from "../utils/storage";

// /**
//  * IMDb-style Dashboard (Option: subtle base + premium micro-interactions)
//  *
//  * - Loads movies and user's reviews from backend (/api/movies, /api/reviews/me)
//  * - Loads favorites from localStorage key "mra_favorites" (array of movie IDs)
//  * - Maps reviews -> movie objects to render review tiles like IMDb
//  * - Smooth, subtle animations using Tailwind classes (scale, fade, translate)
//  *
//  * Notes:
//  * - Backend must expose /api/movies and /api/reviews/me (authenticated).
//  * - Movie objects are expected to have either _id or id; this component handles both.
//  */

// export default function Dashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   // UI + data
//   const [loading, setLoading] = useState(true);
//   const [moviesMap, setMoviesMap] = useState({}); // id => movie
//   const [favorites, setFavorites] = useState([]); // array of movie objects
//   const [reviews, setReviews] = useState([]); // user's reviews from backend
//   const [error, setError] = useState("");
//   const containerRef = useRef(null);

//   // theme classes
//   const isDark = theme === "dark";
//   const pageBg = isDark ? "bg-[#05060A] text-gray-100" : "bg-gray-50 text-gray-900";
//   const panelBg = isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200";
//   const subtle = isDark ? "text-gray-400" : "text-gray-500";

//   // fetch movies + reviews + favorites
//   useEffect(() => {
//     let mounted = true;
//     if (!user) {
//       // if no user, send to login (optional)
//       // navigate("/login");
//       setLoading(false);
//       return;
//     }

//     async function loadAll() {
//       setLoading(true);
//       setError("");
//       try {
//         // get movies
//         const moviesRes = await API.get("/api/movies");
//         const moviesArr = Array.isArray(moviesRes.data) ? moviesRes.data : [];
//         const map = {};
//         moviesArr.forEach((m) => {
//           const key = m._id || m.id || String(m.title || m.title?.toLowerCase());
//           map[key] = { ...m, _key: key };
//         });
//         if (!mounted) return;
//         setMoviesMap(map);

//         // get user reviews
//         // backend endpoint should return array of reviews with movieId referencing movie _id or id
//         const reviewsRes = await API.get("/api/reviews/me");
//         const rv = Array.isArray(reviewsRes.data) ? reviewsRes.data : [];
//         if (!mounted) return;
//         setReviews(rv);

//         // load favorites (IDs stored in localStorage)
//         const favIds = loadJSON("mra_favorites", []);
//         const favObjs = favIds
//           .map((fid) => {
//             // try both _id and id lookup
//             return map[fid] || Object.values(map).find((m) => String(m._id || m.id) === String(fid));
//           })
//           .filter(Boolean);
//         setFavorites(favObjs);
//       } catch (err) {
//         console.error("Dashboard load error:", err);
//         setError(err?.response?.data?.message || err.message || "Failed to load dashboard data.");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     loadAll();
//     return () => (mounted = false);
//   }, [user]);

//   // helpers
//   const openMovie = (id) => {
//     // id may be _id or id
//     navigate(`/movie/${id}`);
//   };

//   const removeFavorite = (movieId) => {
//     const updated = favorites.filter((m) => String(m._id || m.id) !== String(movieId));
//     setFavorites(updated);
//     saveJSON("mra_favorites", updated.map((m) => m._id || m.id));
//   };

//   const clearFavorites = () => {
//     if (!favorites.length) return;
//     if (!window.confirm("Clear all favorites?")) return;
//     saveJSON("mra_favorites", []);
//     setFavorites([]);
//   };

//   const deleteReview = async (reviewId) => {
//     if (!window.confirm("Delete this review?")) return;
//     try {
//       await API.delete(`/api/reviews/${reviewId}`);
//       setReviews((prev) => prev.filter((r) => r._id !== reviewId && r.id !== reviewId));
//     } catch (err) {
//       console.error("Delete review failed", err);
//       alert(err?.response?.data?.message || "Failed to delete review");
//     }
//   };

//   // derived stats
//   const totalReviews = reviews.length;
//   const avgRating =
//     totalReviews === 0
//       ? "—"
//       : (reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / totalReviews).toFixed(1);

//   // UI: subtle entrance animation classes (combined with small JS-driven stagger)
//   const fadeInCard = "opacity-0 translate-y-2";
//   // We'll add data-animate attribute to animate in useEffect (simple stagger)
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const items = Array.from(containerRef.current.querySelectorAll("[data-animate='card']"));
//     items.forEach((el, i) => {
//       el.style.transition = "opacity 360ms ease, transform 360ms ease";
//       setTimeout(() => {
//         el.classList.remove("opacity-0", "translate-y-2");
//       }, 70 * i);
//     });
//   }, [loading, favorites, reviews, moviesMap]);

//   // Loading / error states
//   if (loading) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
//         <div className="text-lg font-medium">Loading your dashboard…</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
//         <div className="p-6 rounded-xl border ${panelBg}">
//           <div className="text-red-400 font-semibold mb-2">Error</div>
//           <div className="mb-4">{error}</div>
//           <button onClick={() => window.location.reload()} className="px-4 py-2 bg-indigo-600 text-white rounded">
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`${pageBg} min-h-screen py-8 px-6`}>
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-12 gap-6">
//           {/* Left column: Profile card (IMDb-like vertical card) */}
//           <aside className="col-span-12 lg:col-span-3">
//             <div className={`${panelBg} border rounded-2xl p-6 shadow-sm`}>
//               <div className="flex flex-col items-center gap-4">
//                 <div
//                   className="w-28 h-28 rounded-full bg-indigo-600 text-white text-4xl flex items-center justify-center font-semibold shadow-lg transform transition-transform duration-300"
//                   title={user?.name || user?.email}
//                 >
//                   {user?.name ? user.name[0].toUpperCase() : (user?.email || "U")[0].toUpperCase()}
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl font-bold">{user?.name || user?.email}</div>
//                   <div className={`text-sm ${subtle}`}>{user?.email}</div>
//                 </div>

//                 <div className="w-full mt-3 grid grid-cols-2 gap-3">
//                   <div className="p-3 bg-black/5 rounded-lg text-center">
//                     <div className="text-sm text-gray-400">Total Reviews</div>
//                     <div className="text-lg font-bold">{totalReviews}</div>
//                   </div>
//                   <div className="p-3 bg-black/5 rounded-lg text-center">
//                     <div className="text-sm text-gray-400">Average Rating</div>
//                     <div className="text-lg font-bold">{avgRating}</div>
//                   </div>
//                 </div>

//                 <div className="w-full mt-4 flex gap-2">
//                   <button
//                     onClick={() => navigate("/settings")}
//                     className="flex-1 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm shadow hover:brightness-105 transition"
//                   >
//                     Edit Profile
//                   </button>
//                   <button
//                     onClick={() => { logout && logout(); navigate("/"); }}
//                     className="px-3 py-2 rounded-md bg-gray-700 text-white text-sm shadow hover:brightness-105 transition"
//                   >
//                     Sign out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Main column */}
//           <main className="col-span-12 lg:col-span-9 space-y-6" ref={containerRef}>
//             {/* Favorites panel (poster grid) */}
//             <section data-animate="card" className={`${fadeInCard} ${panelBg} border rounded-2xl p-6 shadow-sm`}>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-2xl font-bold">Your Watchlist</h2>
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={clearFavorites}
//                     disabled={!favorites.length}
//                     className={`text-sm ${favorites.length ? "text-rose-400 hover:underline" : "text-gray-400 cursor-not-allowed"}`}
//                   >
//                     Clear All
//                   </button>
//                 </div>
//               </div>

//               {favorites.length === 0 ? (
//                 <div className={`${subtle} py-8 text-center`}>Your watchlist is empty. Add favorites on movie pages.</div>
//               ) : (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                   {favorites.map((m) => (
//                     <div
//                       key={m._id || m.id || m._key}
//                       className="group relative rounded-lg overflow-hidden shadow hover:scale-[1.02] transform transition duration-300"
//                     >
//                       <img
//                         src={m.image}
//                         alt={m.title}
//                         className="w-full h-44 object-cover"
//                         onClick={() => openMovie(m._id || m.id)}
//                       />
//                       <div className="p-2 bg-linear-to-t from-black/60 to-transparent absolute bottom-0 left-0 right-0 text-white">
//                         <div className="font-semibold text-sm line-clamp-1">{m.title}</div>
//                       </div>
//                       <button
//                         onClick={() => removeFavorite(m._id || m.id)}
//                         className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
//                         title="Remove favorite"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </section>

//             {/* Reviews panel (IMDb style list) */}
//             <section data-animate="card" className={`${fadeInCard} ${panelBg} border rounded-2xl p-6 shadow-sm`}>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-2xl font-bold">Your Reviews</h2>
//                 <div className={`${subtle} text-sm`}>{totalReviews} review{totalReviews !== 1 ? "s" : ""}</div>
//               </div>

//               {reviews.length === 0 ? (
//                 <div className={`${subtle} py-8 text-center`}>
//                   You haven't written any reviews yet. Write reviews on movie pages.
//                   <div className="mt-3">
//                     <Link to="/home" className="text-indigo-500 hover:underline">Browse movies →</Link>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {reviews
//                     .slice()
//                     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//                     .map((r) => {
//                       const movieId = r.movieId || r.movie || r.movie_id;
//                       const m =
//                         moviesMap[movieId] ||
//                         Object.values(moviesMap).find((x) => String(x._id || x.id) === String(movieId)) ||
//                         null;

//                       return (
//                         <article
//                           key={r._id || r.id}
//                           className="flex gap-4 p-4 rounded-lg hover:shadow-lg transition bg-linear-to-br from-black/0 to-black/2"
//                         >
//                           <img
//                             src={m?.image || ""}
//                             alt={m?.title || "poster"}
//                             onClick={() => m && openMovie(m._id || m.id)}
//                             className="w-24 h-36 object-cover rounded-md cursor-pointer shadow-sm"
//                           />

//                           <div className="flex-1">
//                             <div className="flex items-start justify-between">
//                               <div>
//                                 <div
//                                   onClick={() => m && openMovie(m._id || m.id)}
//                                   className="font-semibold text-lg cursor-pointer hover:text-indigo-500"
//                                 >
//                                   {m?.title || r.title || "Unknown Movie"}
//                                 </div>
//                                 <div className={`text-sm ${subtle}`}>{new Date(r.createdAt).toLocaleDateString()}</div>
//                               </div>

//                               <div className="text-right">
//                                 <div className="text-yellow-400 font-bold">⭐ {r.rating}/10</div>
//                                 <div className="mt-2 flex gap-2">
//                                   <button
//                                     onClick={() => navigate(`/movie/${m?._id || m?.id}`, { state: { editReview: r } })}
//                                     className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
//                                   >
//                                     Edit
//                                   </button>
//                                   <button
//                                     onClick={() => deleteReview(r._id || r.id)}
//                                     className="px-3 py-1 bg-rose-600 text-white rounded text-sm"
//                                   >
//                                     Delete
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>

//                             <p className="mt-3 text-sm italic">{r.comment}</p>

//                             {/* optional movie meta */}
//                             {m && (
//                               <div className="mt-3 text-xs flex flex-wrap gap-3">
//                                 {m.year && <span className="px-2 py-1 bg-black/5 rounded">{m.year}</span>}
//                                 {Array.isArray(m.genre) && m.genre.slice(0, 3).map((g) => (
//                                   <span key={g} className="px-2 py-1 bg-black/5 rounded">{g}</span>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </article>
//                       );
//                     })}
//                 </div>
//               )}
//             </section>

//             {/* Quick actions / export */}
//             <section data-animate="card" className={`${fadeInCard} ${panelBg} border rounded-2xl p-4 shadow-sm flex items-center justify-end gap-3`}>
//               <button
//                 onClick={() => {
//                   // export CSV
//                   if (!reviews.length) return alert("No reviews to export");
//                   const rows = reviews.map((r) => {
//                     const m =
//                       moviesMap[r.movieId] ||
//                       Object.values(moviesMap).find((x) => String(x._id || x.id) === String(r.movieId)) ||
//                       {};
//                     return {
//                       Movie: m.title || "",
//                       Rating: r.rating,
//                       Comment: (r.comment || "").replace(/\n/g, " "),
//                       Date: new Date(r.createdAt).toLocaleString(),
//                     };
//                   });
//                   const keys = Object.keys(rows[0]);
//                   const csv = [keys.join(","), ...rows.map((row) => keys.map((k) => `"${String(row[k] || "").replace(/"/g, '""')}"`).join(","))].join("\r\n");
//                   const blob = new Blob([csv], { type: "text/csv" });
//                   const a = document.createElement("a");
//                   a.href = URL.createObjectURL(blob);
//                   a.download = `reviews_${user?.email || "me"}.csv`;
//                   a.click();
//                 }}
//                 className="px-4 py-2 rounded bg-indigo-600 text-white text-sm shadow hover:brightness-105 transition"
//               >
//                 Export CSV
//               </button>

//               <button
//                 onClick={() => {
//                   // simple print / PDF: open new window with review HTML
//                   const html = `
//                     <html><head><title>${user?.name || user?.email} — Reviews</title></head>
//                     <body style="font-family:Arial;padding:20px;">
//                       <h1>${user?.name || user?.email} — Reviews</h1>
//                       ${reviews.map((r) => {
//                         const m = moviesMap[r.movieId] || {};
//                         return `<div style="margin-bottom:12px;"><strong>${m.title || ""} — ${r.rating}/10</strong><div style="color:#666">${new Date(r.createdAt).toLocaleString()}</div><p style="font-style:italic">${String(r.comment || "").replace(/</g, "&lt;")}</p></div>`;
//                       }).join("")}
//                     </body></html>
//                   `;
//                   const w = window.open("", "_blank");
//                   w.document.write(html);
//                   w.document.close();
//                   w.print();
//                 }}
//                 className="px-4 py-2 rounded bg-green-600 text-white text-sm shadow hover:brightness-105 transition"
//               >
//                 Print / PDF
//               </button>
//             </section>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";
import API from "../api/api";
import { loadJSON, saveJSON } from "../utils/storage";

/**
 * Full corrected Dashboard.jsx
 * - Robust mapping between reviews and movies (tries multiple keys)
 * - Loads /api/movies and /api/reviews/me
 * - Resolves favorites stored in localStorage under "mra_favorites" (accepts either _id or id)
 * - IMDb-like layout, subtle micro-interactions, responsive
 * - Defensive: won't crash if backend fields differ; falls back gracefully
 *
 * Assumptions (safely handled):
 * - Movie objects have either `_id` or `id` (or both).
 * - Review objects reference movies via one of: `movieId`, `movie_id`, `movie`, or `movie` object with `_id`.
 * - If poster (`image`) is missing, a placeholder is shown.
 */

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='900' viewBox='0 0 600 900' fill='none'>
      <rect width='600' height='900' fill='#e5e7eb'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-family='Arial' font-size='28'>No poster</text>
    </svg>`
  );

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [moviesMap, setMoviesMap] = useState({}); // maps by id/_id to movie
  const [moviesList, setMoviesList] = useState([]); // keep array for fallbacks
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]); // array of movie objects

  const containerRef = useRef(null);

  const isDark = theme === "dark";
  const pageBg = isDark ? "bg-[#030305] text-gray-100" : "bg-gray-50 text-gray-900";
  const panelBg = isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200";
  const subtle = isDark ? "text-gray-400" : "text-gray-600";

  // Helper: normalize movie id keys
  const addToMap = (map, m) => {
    const keys = [];
    if (m._id) keys.push(String(m._id));
    if (m.id) keys.push(String(m.id));
    if (m._key) keys.push(String(m._key));
    // also by title (lower) as last resort
    if (m.title) keys.push(String(m.title).toLowerCase());
    keys.forEach((k) => {
      if (!map[k]) map[k] = m;
    });
  };

  // Robust lookup for a movie from a review object
  const findMovieForReview = (r) => {
    if (!r) return null;
    const possibleIds = [
      r.movieId,
      r.movie_id,
      r.movie,
      (r.movie && r.movie._id) || null,
      (r.movie && r.movie.id) || null,
      r.movieId && String(r.movieId),
      r.movie_id && String(r.movie_id),
    ].filter(Boolean);

    // direct key match
    for (const id of possibleIds) {
      const s = String(id);
      if (moviesMap[s]) return moviesMap[s];
    }

    // try to match by _id/id inside map values
    for (const m of moviesList) {
      if (String(m._id) === String(r.movieId) || String(m.id) === String(r.movieId)) return m;
      if (String(m._id) === String(r.movie_id) || String(m.id) === String(r.movie_id)) return m;
      if (r.title && String(m.title).toLowerCase() === String(r.title).toLowerCase()) return m;
    }
    return null;
  };

  // Load movies + reviews + favorites
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        // fetch movies
        const moviesRes = await API.get("/api/movies");
        const moviesArr = Array.isArray(moviesRes.data) ? moviesRes.data : [];
        if (!mounted) return;

        const map = {};
        moviesArr.forEach((m) => addToMap(map, m));
        setMoviesMap(map);
        setMoviesList(moviesArr);

        // fetch reviews for current user
        // endpoint expected: GET /api/reviews/me
        let reviewsArr = [];
        try {
          const revRes = await API.get("/api/reviews/me");
          reviewsArr = Array.isArray(revRes.data) ? revRes.data : [];
        } catch (revErr) {
          // Some backends return all reviews and you filter client-side.
          // Try GET /api/reviews and filter by user if necessary.
          if (revErr?.response?.status === 404) {
            // fallback: try /api/reviews
            try {
              const allRev = await API.get("/api/reviews");
              reviewsArr = Array.isArray(allRev.data) ? allRev.data : [];
              // try to filter by user if review has user/email link
              // best-effort: filter by user.email if review.userEmail/userId exists
              reviewsArr = reviewsArr.filter((rv) => {
                if (!rv) return false;
                const uid = rv.userId || rv.user || rv.user_email || rv.userEmail;
                if (!uid) return false;
                if (typeof uid === "string" && uid === user?.email) return true;
                if (typeof uid === "object" && (uid.email === user?.email || uid._id === user?._id)) return true;
                return false;
              });
            } catch (e) {
              // ignore and move on - reviewsArr stays []
            }
          } else {
            // other error — rethrow to outer catch
            throw revErr;
          }
        }

        if (!mounted) return;
        setReviews(reviewsArr);

        // favorites from localStorage (IDs array) - could contain _id or id
        const favIds = loadJSON("mra_favorites", []);
        const resolvedFavs = (Array.isArray(favIds) ? favIds : [])
          .map((fid) => {
            const s = String(fid);
            if (map[s]) return map[s];
            // try by searching moviesList by _id/id
            const found = moviesArr.find((m) => String(m._id) === s || String(m.id) === s);
            return found || null;
          })
          .filter(Boolean);
        setFavorites(resolvedFavs);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setError(err?.response?.data?.message || err.message || "Failed to load dashboard data.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (user) load();
    else {
      // no user: clear state and stop loading
      setMoviesMap({});
      setMoviesList([]);
      setReviews([]);
      setFavorites([]);
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // small entrance animation
  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll("[data-anim='card']");
    items.forEach((el, i) => {
      el.classList.add("opacity-0", "translate-y-2");
      el.style.transition = "opacity 340ms ease, transform 340ms ease";
      setTimeout(() => {
        el.classList.remove("opacity-0", "translate-y-2");
      }, 70 * i);
    });
  }, [loading, reviews, favorites, moviesMap]);

  // Actions
  const openMovie = (id) => {
    if (!id) return;
    navigate(`/movie/${id}`);
  };

  const removeFavorite = (movieId) => {
    const updated = favorites.filter((m) => String(m._id || m.id) !== String(movieId));
    setFavorites(updated);
    saveJSON("mra_favorites", updated.map((m) => m._id || m.id));
  };

  const clearFavorites = () => {
    if (!favorites.length) return;
    if (!window.confirm("Clear all favorites?")) return;
    setFavorites([]);
    saveJSON("mra_favorites", []);
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await API.delete(`/api/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => String(r._id || r.id) !== String(reviewId)));
    } catch (err) {
      console.error("Delete review failed:", err);
      alert(err?.response?.data?.message || "Failed to delete review");
    }
  };

  // Derived stats
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews === 0
      ? "—"
      : (reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / totalReviews).toFixed(1);

  // Loading / error UIs
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
        <div className="text-lg font-medium">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
        <div className={`${panelBg} p-6 rounded-xl border`}>
          <div className="text-red-400 font-semibold mb-2">Error</div>
          <div className="mb-4">{error}</div>
          <div className="flex gap-2">
            <button onClick={() => window.location.reload()} className="px-3 py-2 bg-indigo-600 text-white rounded">Retry</button>
            <button onClick={() => navigate("/home")} className="px-3 py-2 bg-gray-300 rounded">Home</button>
          </div>
        </div>
      </div>
    );
  }

  // Render
  return (
    <div className={`${pageBg} min-h-screen py-8 px-4`}>
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="grid grid-cols-12 gap-6">
          {/* Profile left column */}
          <aside className="col-span-12 lg:col-span-3">
            <div className={`${panelBg} border rounded-2xl p-6 shadow-sm`}>
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-28 h-28 rounded-full bg-indigo-600 text-white text-4xl flex items-center justify-center font-semibold shadow-lg"
                  title={user?.name || user?.email}
                >
                  {(user?.name && user.name[0]) || (user?.email && user.email[0]) || "U"}
                </div>

                <div className="text-center">
                  <div className="text-xl font-bold">{user?.name || user?.email}</div>
                  <div className={`text-sm ${subtle}`}>{user?.email}</div>
                </div>

                <div className="w-full mt-3 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg text-center bg-black/5">
                    <div className="text-sm text-gray-400">Reviews</div>
                    <div className="text-lg font-bold">{totalReviews}</div>
                  </div>
                  <div className="p-3 rounded-lg text-center bg-black/5">
                    <div className="text-sm text-gray-400">Avg Rating</div>
                    <div className="text-lg font-bold">{avgRating}</div>
                  </div>
                </div>

                <div className="w-full mt-4 flex gap-2">
                  <button
                    onClick={() => navigate("/settings")}
                    className="flex-1 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm shadow hover:brightness-105 transition"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => { logout && logout(); navigate("/"); }}
                    className="px-3 py-2 rounded-md bg-gray-700 text-white text-sm shadow hover:brightness-105 transition"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="col-span-12 lg:col-span-9 space-y-6">
            {/* Favorites / Watchlist */}
            <section data-anim="card" className={`${panelBg} border rounded-2xl p-6 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Your Watchlist</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearFavorites}
                    disabled={!favorites.length}
                    className={`text-sm ${favorites.length ? "text-rose-400 hover:underline" : "text-gray-400 cursor-not-allowed"}`}
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {favorites.length === 0 ? (
                <div className={`${subtle} py-12 text-center`}>
                  Your watchlist is empty.<br />
                  <Link to="/home" className="text-indigo-500 hover:underline">Browse movies →</Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {favorites.map((m) => (
                    <div
                      key={m._id || m.id || m.title}
                      className="group relative rounded-lg overflow-hidden shadow hover:scale-[1.02] transform transition duration-300 cursor-pointer"
                    >
                      <img
                        src={m.image || PLACEHOLDER}
                        alt={m.title || "Poster"}
                        className="w-full h-44 object-cover"
                        onClick={() => openMovie(m._id || m.id)}
                      />
                      <div className="p-2 bg-linear-to-t from-black/60 to-transparent absolute bottom-0 left-0 right-0 text-white">
                        <div className="font-semibold text-sm line-clamp-1">{m.title}</div>
                        <div className="text-xs opacity-80">{Array.isArray(m.genre) ? m.genre.slice(0, 2).join(", ") : m.genre}</div>
                      </div>
                      <button
                        onClick={() => removeFavorite(m._id || m.id)}
                        className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                        title="Remove favorite"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Reviews */}
            <section data-anim="card" className={`${panelBg} border rounded-2xl p-6 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Your Reviews</h2>
                <div className={`${subtle} text-sm`}>{totalReviews} review{totalReviews !== 1 ? "s" : ""}</div>
              </div>

              {reviews.length === 0 ? (
                <div className={`${subtle} py-10 text-center`}>
                  You haven't written any reviews yet.<br />
                  <Link to="/home" className="text-indigo-500 hover:underline">Browse movies →</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews
                    .slice()
                    .sort((a, b) => new Date(b.createdAt || b.created_at || b.createdAt) - new Date(a.createdAt || a.created_at || a.createdAt))
                    .map((r) => {
                      const m = findMovieForReview(r) || null;
                      const poster = (m && (m.image || m.poster)) || PLACEHOLDER;
                      const title = (m && (m.title || m.name)) || r.title || "Unknown Movie";
                      const movieIdForNav = m ? (m._id || m.id) : (r.movieId || r.movie || r.movie_id);

                      return (
                        <article key={r._id || r.id || `${r.movieId}-${r.createdAt}`} className="flex gap-4 p-4 rounded-lg hover:shadow-lg transition bg-linear-to-br from-transparent to-black/1">
                          <img
                            src={poster}
                            alt={title}
                            onClick={() => movieIdForNav && openMovie(movieIdForNav)}
                            className="w-24 h-36 object-cover rounded-md cursor-pointer shadow-sm"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <div
                                  onClick={() => movieIdForNav && openMovie(movieIdForNav)}
                                  className="font-semibold text-lg cursor-pointer hover:text-indigo-500"
                                >
                                  {title}
                                </div>
                                <div className={`text-sm ${subtle}`}>{new Date(r.createdAt || r.created_at || r.date || Date.now()).toLocaleDateString()}</div>
                              </div>

                              <div className="text-right">
                                <div className="text-yellow-400 font-bold">⭐ {r.rating || "—"}/10</div>
                                <div className="mt-2 flex gap-2">
                                  <button
                                    onClick={() => navigate(`/movie/${movieIdForNav}`, { state: { editReview: r } })}
                                    className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deleteReview(r._id || r.id)}
                                    className="px-3 py-1 bg-rose-600 text-white rounded text-sm"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>

                            <p className="mt-3 text-sm italic">{r.comment}</p>

                            {m && (
                              <div className="mt-3 text-xs flex flex-wrap gap-2">
                                {m.year && <span className="px-2 py-1 bg-black/5 rounded">{m.year}</span>}
                                {Array.isArray(m.genre) && m.genre.slice(0, 3).map((g) => <span key={g} className="px-2 py-1 bg-black/5 rounded">{g}</span>)}
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                </div>
              )}
            </section>

            {/* Quick actions */}
            <section data-anim="card" className={`${panelBg} border rounded-2xl p-4 shadow-sm flex justify-end gap-3`}>
              <button
                onClick={() => {
                  if (!reviews.length) return alert("No reviews to export");
                  const rows = reviews.map((r) => {
                    const m = findMovieForReview(r) || {};
                    return {
                      Movie: m.title || r.title || "",
                      Rating: r.rating || "",
                      Comment: (r.comment || "").replace(/\n/g, " "),
                      Date: new Date(r.createdAt || r.created_at || Date.now()).toLocaleString(),
                    };
                  });
                  const keys = Object.keys(rows[0]);
                  const csv = [keys.join(","), ...rows.map((row) => keys.map((k) => `"${String(row[k] || "").replace(/"/g, '""')}"`).join(","))].join("\r\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const a = document.createElement("a");
                  a.href = URL.createObjectURL(blob);
                  a.download = `reviews_${user?.email || "me"}.csv`;
                  a.click();
                }}
                className="px-4 py-2 rounded bg-indigo-600 text-white text-sm shadow hover:brightness-105 transition"
              >
                Export CSV
              </button>

              <button
                onClick={() => {
                  const html = `
                    <html><head><title>${user?.name || user?.email} — Reviews</title></head>
                    <body style="font-family:Arial;padding:20px;">
                      <h1>${user?.name || user?.email} — Reviews</h1>
                      ${reviews.map((r) => {
                        const m = findMovieForReview(r) || {};
                        return `<div style="margin-bottom:12px;"><strong>${m.title || r.title || ""} — ${r.rating || ""}/10</strong><div style="color:#666">${new Date(r.createdAt || r.created_at || Date.now()).toLocaleString()}</div><p style="font-style:italic">${String(r.comment || "").replace(/</g, "&lt;")}</p></div>`;
                      }).join("")}
                    </body></html>
                  `;
                  const w = window.open("", "_blank");
                  w.document.write(html);
                  w.document.close();
                  w.print();
                }}
                className="px-4 py-2 rounded bg-green-600 text-white text-sm shadow hover:brightness-105 transition"
              >
                Print / PDF
              </button>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
