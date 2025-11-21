// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { movies } from "../data/movies";
// import ReviewForm from "../components/ReviewForm";
// import { loadJSON, saveJSON } from "../utils/storage";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";

// export default function MovieDetail() {
//   const { id } = useParams();
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();
//   const movie = movies.find((m) => m.id === id);
//   const { user } = useContext(AuthContext);

//   const [reviews, setReviews] = useState([]);
//   const [editingReview, setEditingReview] = useState(null);
//   const [sortBy, setSortBy] = useState("recent");
//   const [expanded, setExpanded] = useState(null);

//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [showRatingBreakdown, setShowRatingBreakdown] = useState(false);

//   const [isFavorite, setIsFavorite] = useState(false);

//   const [openReplyFor, setOpenReplyFor] = useState(null);
//   const [replyText, setReplyText] = useState("");

//   useEffect(() => {
//     const all = loadJSON("mra_reviews", []);
//     const movieReviews = all
//       .filter((r) => r.movieId === id)
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     setReviews(movieReviews);

//     const favs = loadJSON("mra_favorites", []);
//     setIsFavorite(favs.includes(id));
//   }, [id]);

//   const persistReviews = (data) => saveJSON("mra_reviews", data);

//   const onAdd = (review) => {
//     const newReview = {
//       ...review,
//       replies: [],
//       upvotes: 0,
//       downvotes: 0,
//     };

//     const all = [newReview, ...loadJSON("mra_reviews", [])];
//     persistReviews(all);

//     setReviews(
//       all
//         .filter((r) => r.movieId === id)
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     );

//     setShowReviewForm(false);
//   };

//   const onEdit = (updated) => {
//     const all = loadJSON("mra_reviews", []).map((r) =>
//       r.id === updated.id ? { ...r, ...updated } : r
//     );
//     persistReviews(all);

//     setReviews(
//       all
//         .filter((r) => r.movieId === id)
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     );

//     setEditingReview(null);
//   };

//   const onDelete = (reviewId) => {
//     if (!window.confirm("Delete this review?")) return;

//     const all = loadJSON("mra_reviews", []).filter((r) => r.id !== reviewId);
//     persistReviews(all);

//     setReviews(
//       all
//         .filter((r) => r.movieId === id)
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     );
//   };

//   const onVote = (reviewId, type) => {
//     const all = loadJSON("mra_reviews", []).map((r) => {
//       if (r.id === reviewId) {
//         return {
//           ...r,
//           upvotes: type === "up" ? (r.upvotes || 0) + 1 : r.upvotes,
//           downvotes: type === "down" ? (r.downvotes || 0) + 1 : r.downvotes,
//         };
//       }
//       return r;
//     });

//     persistReviews(all);

//     setReviews(
//       all
//         .filter((r) => r.movieId === id)
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     );
//   };

//   const addReply = (reviewId, text) => {
//     if (!user) return alert("Please log in to reply.");
//     if (!text.trim()) return;

//     const reply = {
//       id: Date.now().toString(),
//       reviewId,
//       userId: user.email,
//       userName: user.name || user.username || "User",
//       comment: text.trim(),
//       createdAt: new Date().toISOString(),
//     };

//     const all = loadJSON("mra_reviews", []).map((r) =>
//       r.id === reviewId ? { ...r, replies: [...(r.replies || []), reply] } : r
//     );

//     persistReviews(all);

//     setReviews(
//       all
//         .filter((r) => r.movieId === id)
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     );

//     setReplyText("");
//     setOpenReplyFor(null);
//   };

//   const toggleFavorite = () => {
//     const favs = loadJSON("mra_favorites", []);
//     let updated;

//     if (favs.includes(id)) {
//       updated = favs.filter((f) => f !== id);
//       setIsFavorite(false);
//     } else {
//       updated = [...favs, id];
//       setIsFavorite(true);
//     }

//     saveJSON("mra_favorites", updated);
//   };

//   if (!movie) return <div className="p-6">Movie not found</div>;

//   const sortedReviews = [...reviews].sort((a, b) => {
//     if (sortBy === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
//     if (sortBy === "rating") return b.rating - a.rating;
//     if (sortBy === "helpful") return (b.upvotes || 0) - (a.upvotes || 0);
//     return 0;
//   });

//   return (
//     <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen p-6`}>

//       <div className="max-w-6xl mx-auto space-y-10">

//         {/* TOP SECTION */}
//         <div className="grid md:grid-cols-2 gap-10">

//           {/* TRAILER */}
//           <div className="bg-gray-100 p-6 rounded-2xl shadow-xl border">
//             <div className="flex items-start justify-between">
//               <h2 className="text-2xl font-bold text-gray-900 animate-pulse relative">Trailer</h2>

//               <button
//                 onClick={toggleFavorite}
//                 className={`px-4 py-1 rounded-md font-semibold ${
//                   isFavorite ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {isFavorite ? "★ Favorited" : "☆ Favorite"}
//               </button>
//             </div>

//             <div className="mt-4 relative rounded-xl overflow-hidden shadow-md h-[420px]">
//               <iframe
//                 src={`${movie.trailerUrl}${movie.trailerUrl.includes("?") ? "&" : "?"}autoplay=1&unmute=1`}
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//                 className="absolute inset-0 w-full h-full"
//               />
//             </div>
//  </div>

//           {/* MOVIE DETAILS */}
//           <div className={`${theme === "dark" ? "bg-gray-800 text-white border-gray-100" : "bg-white text-black border-gray-900"} p-6 rounded-2xl shadow-xl border `}>
//             <h1 className="text-3xl font-extrabold">{movie.title}</h1>
//             <p className="text-indigo-400 mt-2">{movie.genre.join(", ")}</p>

//             <div className="mt-3 space-y-1 text-gray-900">
//               <p><strong>Year:</strong> {movie.year}</p>
//               <p><strong>Duration:</strong> {movie.duration} min</p>
//               <p><strong>Director:</strong> {movie.director}</p>
//               <p><strong>Language:</strong> {movie.language}</p>
//             </div>

//             <p className="mt-4">{movie.description}</p>

//             <p className="text-yellow-400 text-xl font-bold mt-3">
//               ⭐ {movie.rating}/10
//             </p>

//             <h3 className="text-xl font-bold mt-6">Cast:</h3>
//             <p className="text-lg font-semibold text-gray-900">
//               {movie.cast?.join("  ")}
//             </p>

//             <div className="mt-6 flex gap-4">
//               <button
//                 onClick={() => setShowReviewForm(!showReviewForm)}
//                 className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700"
//               >
//                 {showReviewForm ? "Close Review Form" : "Write a Review"}
//               </button>

//               <button
//                 onClick={() => setShowRatingBreakdown(!showRatingBreakdown)}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
//               >
//                 {showRatingBreakdown
//                   ? "Hide Rating Breakdown"
//                   : "Show Rating Breakdown"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* REVIEW FORM */}
//         {showReviewForm && (
//           <ReviewForm
//             movieId={id}
//             onAdd={onAdd}
//             onEdit={onEdit}
//             editingReview={editingReview}
//             cancelEdit={() => setEditingReview(null)}
//           />
//         )}

//         {/* RATING BREAKDOWN */}
// {showRatingBreakdown && (
//   <div
//     className={`
//       ${theme === "dark"
//         ? "bg-gray-900 text-white border-gray-100"
//         : "bg-white text-black border-gray-900 "}
//       p-6 rounded-2xl shadow-2xl mt-10 transition-all duration-300
//       hover:shadow-indigo-500/20  border
//     `}
//   >
//     <h3 className="text-2xl font-extrabold mb-6 text-center bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent animate-pulse relative">
//       Rating Breakdown
//     </h3>

//     <div className="space-y-5">
//       {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((star, i) => {
//         const count = reviews.filter((r) => r.rating === star).length;
//         const total = reviews.length || 1;
//         const percent = Math.round((count / total) * 100);

//         return (
//           <div key={star} className="group">
//             {/* LABELS */}
//             <div className="flex justify-between text-sm mb-1">
//               <span className="font-medium">{star}/10</span>
//               <span className="font-semibold">{percent}%</span>
//             </div>

//             {/* PROGRESS BAR TRACK */}
//             <div
//               className={`
//                 w-full h-4 rounded-full overflow-hidden shadow-inner
//                 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}
//               `}
//             >
//               {/* ANIMATED FILL */}
//               <div
//                 style={{ width: `${percent}%` }}
//                 className={`
//                   h-full rounded-full transition-all duration-700 group-hover:brightness-110
//                   ${star >= 8
//                     ? "bg-linear-to-r from-green-400 to-green-600"
//                     : star >= 5
//                     ? "bg-linear-to-r from-yellow-400 to-orange-500"
//                     : "bg-linear-to-r from-red-500 to-red-700"}
//                 `}
//               ></div>
//             </div>
//           </div>
//         );
//       })}
//     </div>

//     {/* EXTRA GLOW EFFECT */}
//     <style>{`
//       .glow-bar {
//         animation: glowPulse 2s infinite;
//       }
//       @keyframes glowPulse {
//         0% { box-shadow: 0 0 8px rgba(99,102,241,0.2); }
//         50% { box-shadow: 0 0 16px rgba(168,85,247,0.4); }
//         100% { box-shadow: 0 0 8px rgba(99,102,241,0.2); }
//       }
//     `}</style>
//   </div>
// )}

//         {/* SORT BUTTONS */}
//         <div className="flex gap-4">
//           {[
//             { id: "recent", label: "Newest" },
//             { id: "rating", label: "Highest Rated" },
//             { id: "helpful", label: "Most Helpful" },
//           ].map((btn) => (
//             <button
//               key={btn.id}
//               onClick={() => setSortBy(btn.id)}
//               className={`px-4 py-2 rounded-lg font-semibold ${
//                 sortBy === btn.id
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-300 text-black"
//               }`}
//             >
//               {btn.label}
//             </button>
//           ))}
//         </div>

//        {/* REVIEWS */}
// <div className="space-y-6">
//   {sortedReviews.map((r) => (
//     <div
//       key={r.id}
//       className={`p-6 rounded-2xl shadow hover:shadow-xl transition relative border
//         ${theme === "dark"
//           ? "bg-gray-800 text-white border-gray-700"
//           : "bg-white text-black border-gray-200"
//         }`}
//     >
//       {/* USER INFO */}
//       <div className="flex items-center gap-3 mb-3">
//         <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl
//           ${theme === "dark" ? "bg-indigo-500 text-white" : "bg-indigo-200 text-indigo-700"}
//         `}>
//           {r.userName[0]}
//         </div>

//         <div className="flex-1">
//           <p className="font-semibold">{r.userName}</p>
//           <p className={theme === "dark" ? "text-xs text-gray-400" : "text-xs text-gray-500"}>
//             {new Date(r.createdAt).toLocaleString()}
//           </p>
//         </div>

//         <div className={theme === "dark" ? "text-yellow-400 font-bold text-lg" : "text-yellow-600 font-bold text-lg"}>
//           ⭐ {r.rating}/10
//         </div>
//       </div>

//       {/* COMMENT */}
//       <p className={`italic border-l-4 pl-4 ${
//         theme === "dark"
//           ? "border-indigo-400 text-gray-300"
//           : "border-indigo-600 text-gray-700"
//       }`}>
//         {expanded === r.id
//           ? r.comment
//           : r.comment.length > 120
//           ? r.comment.slice(0, 120) + "..."
//           : r.comment}
//       </p>

//       {r.comment.length > 120 && (
//         <button
//           className={`text-sm mt-1 ${
//             theme === "dark" ? "text-indigo-400" : "text-indigo-600"
//           }`}
//           onClick={() =>
//             setExpanded(expanded === r.id ? null : r.id)
//           }
//         >
//           {expanded === r.id ? "Read less" : "Read more"}
//         </button>
//       )}

//       {/* REPLIES */}
//       <div className="mt-4 space-y-3">
//         {(r.replies || []).map((rep) => (
//           <div
//             key={rep.id}
//             className={`p-3 rounded-lg border ${
//               theme === "dark"
//                 ? "bg-gray-800 border-gray-700 text-white"
//                 : "bg-gray-100 border-gray-300 text-black"
//             }`}
//           >
//             <p className="font-semibold text-sm">{rep.userName}</p>
//             <p className={theme === "dark" ? "text-xs text-gray-400" : "text-xs text-gray-500"}>
//               {new Date(rep.createdAt).toLocaleString()}
//             </p>
//             <p className="mt-1">{rep.comment}</p>
//           </div>
//         ))}

//         {/* REPLY INPUT */}
//         {openReplyFor === r.id ? (
//           <div className="flex gap-2 mt-2">
//             <input
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//               className={`flex-1 p-2 rounded-md border ${
//                 theme === "dark"
//                   ? "bg-gray-700 text-white border-gray-600"
//                   : "bg-white text-black border-gray-300"
//               }`}
//               placeholder="Write a reply..."
//             />

//             <button
//               onClick={() => addReply(r.id, replyText)}
//               className="px-4 py-2 bg-indigo-600 text-white rounded-md"
//             >
//               Reply
//             </button>

//             <button
//               onClick={() => {
//                 setOpenReplyFor(null);
//                 setReplyText("");
//               }}
//               className={`px-4 py-2 rounded-md ${
//                 theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-300 text-black"
//               }`}
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={() => setOpenReplyFor(r.id)}
//             className={`text-sm mt-2 ${
//               theme === "dark" ? "text-indigo-400" : "text-indigo-600"
//             }`}
//           >
//             Reply
//           </button>
//         )}
//       </div>

//       {/* VOTES */}
//       <div className="flex gap-4 mt-4 text-lg">
//         <button
//           onClick={() => onVote(r.id, "up")}
//           className={`hover:scale-110 transition ${
//             theme === "dark" ? "text-green-400" : "text-green-600"
//           }`}
//         >
//           👍 {r.upvotes || 0}
//         </button>

//         <button
//           onClick={() => onVote(r.id, "down")}
//           className={`hover:scale-110 transition ${
//             theme === "dark" ? "text-red-400" : "text-red-600"
//           }`}
//         >
//           👎 {r.downvotes || 0}
//         </button>
//       </div>

//       {/* EDIT / DELETE */}
//       {user?.email === r.userId && (
//         <div className="absolute top-4 right-4 flex gap-3 text-sm">
//           <button
//             className={theme === "dark" ? "text-indigo-400" : "text-indigo-600"}
//             onClick={() => setEditingReview(r)}
//           >
//             Edit
//           </button>

//           <button
//             className={theme === "dark" ? "text-red-400" : "text-red-600"}
//             onClick={() => onDelete(r.id)}
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   ))}
// </div>

//         {/* RELATED MOVIES */}
//         <div className="bg-gray-100 p-6 rounded-2xl shadow-xl border mt-10 ">
//           <h3 className="text-2xl font-extrabold mb-6 text-gray-900 animate-pulse relative">
//             Related Movies
//           </h3>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {movies
//               .filter(
//                 (m) =>
//                   m.id !== id &&
//                   m.genre.some((g) => movie.genre.includes(g))
//               )
//               .slice(0, 4)
//               .map((m, i) => (
//                 <a
//                   key={m.id}
//                   href={`/movie/${m.id}`}
//                   className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:scale-[1.03]"
//                   style={{
//                     animation: `fadeInUp 0.3s ease forwards`,
//                     animationDelay: `${i * 120}ms`,
//                   }}
//                 >
//                   <img
//                     src={m.image}
//                     className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
//                   />
//                   <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-90 transition duration-500"></div>
//                   <div className="absolute bottom-3 left-3 right-3">
//                     <p className="text-white text-lg font-bold tracking-wide group-hover:text-yellow-300 transition">
//                       {m.title}
//                     </p>
//                     <p className="text-gray-300 text-xs mt-1 group-hover:text-gray-200 transition">
//                       {m.genre.slice(0, 2).join(", ")}
//                     </p>
//                   </div>
//                 </a>
//               ))}
//           </div>
//         </div>

//         <style>
//           {`
//             @keyframes fadeInUp {
//               0% { opacity: 0; transform: translateY(20px); }
//               100% { opacity: 1; transform: translateY(0); }
//             }
//           `}
//         </style>

//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/api";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";

// export default function MovieDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { theme } = useContext(ThemeContext);
//   const { user } = useContext(AuthContext);

//   const [movie, setMovie] = useState(null);
//   const [allMovies, setAllMovies] = useState([]);

//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     // Fetch movie details
//     API.get(`/api/movies/${id}`)
//       .then(res => setMovie(res.data))
//       .catch(() => navigate("/home"));

//     // fetch all movies (for related section)
//     API.get("/api/movies")
//       .then(res => setAllMovies(res.data))
//       .catch(() => {});
//   }, [id]);

//   if (!movie) {
//     return (
//       <div className="p-10 text-center text-xl">
//         Loading Movie Details...
//       </div>
//     );
//   }

//   const addReview = async () => {
//     if (!user) {
//       alert("Login required to post review.");
//       return;
//     }

//     try {
//       const res = await API.post(`/api/movies/${_id}/reviews`, {
//         author: user.email,
//         comment,
//         rating
//       });

//       setMovie(prev => ({
//         ...prev,
//         reviews: [...prev.reviews, res.data]
//       }));

//       setComment("");
//       setRating(5);
//       setShowReviewForm(false);
//     } catch (err) {
//       console.error("Failed to add review", err);
//       alert("Failed to add review");
//     }
//   };

//   const related = allMovies
//     .filter(m => m._id !== movie._id)
//     .filter(m =>
//       m.genre.some(g => movie.genre.includes(g))
//     )
//     .slice(0, 4);

//   return (
//     <div className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} min-h-screen p-6`}>
//       <div className="max-w-6xl mx-auto space-y-10">

//         {/* TRAILER + DETAILS GRID */}
//         <div className="grid md:grid-cols-2 gap-10">

//           {/* TRAILER */}
//           <div className="bg-gray-100 p-6 rounded-2xl shadow-xl border">
//             <h2 className="text-2xl font-bold text-gray-900 animate-pulse">Trailer</h2>

//             <div className="mt-4 relative rounded-xl overflow-hidden shadow-md h-[420px]">
//               <iframe
//                 src={`${movie.trailerUrl}`}
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//                 className="absolute inset-0 w-full h-full"
//               />
//             </div>
//           </div>

//           {/* MOVIE DETAILS */}
//           <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} p-6 rounded-2xl shadow-xl border`}>
//             <h1 className="text-3xl font-extrabold">{movie.title}</h1>
//             <p className="text-indigo-400 mt-2">{movie.genre.join(", ")}</p>

//             <div className="mt-3 space-y-1">
//               <p><strong>Year:</strong> {movie.year}</p>
//               <p><strong>Duration:</strong> {movie.duration} min</p>
//               <p><strong>Director:</strong> {movie.director}</p>
//               <p><strong>Language:</strong> {movie.language}</p>
//             </div>

//             <p className="mt-4">{movie.description}</p>

//             <p className="text-yellow-400 text-xl font-bold mt-3">
//               ⭐ {movie.rating}/10
//             </p>

//             <h3 className="text-xl font-bold mt-6">Cast:</h3>
//             <p className="text-lg font-semibold">
//               {movie.cast.join("  ")}
//             </p>

//             <button
//               onClick={() => setShowReviewForm(!showReviewForm)}
//               className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700"
//             >
//               {showReviewForm ? "Close Review" : "Write Review"}
//             </button>
//           </div>
//         </div>

//         {/* REVIEW FORM */}
//         {showReviewForm && (
//           <div className="p-6 rounded-2xl border shadow-xl">
//             <h3 className="text-xl font-bold mb-4">Write a Review</h3>

//             <select
//               value={rating}
//               onChange={e => setRating(Number(e.target.value))}
//               className="p-3 border rounded-xl mb-3"
//             >
//               {[10,9,8,7,6,5,4,3,2,1].map(n => (
//                 <option key={n} value={n}>{n}/10</option>
//               ))}
//             </select>

//             <textarea
//               value={comment}
//               onChange={e => setComment(e.target.value)}
//               className="w-full p-4 border rounded-xl h-32"
//               placeholder="Write your review..."
//             />

//             <button
//               onClick={addReview}
//               className="mt-4 px-6 py-3 bg-green-600 text-white rounded-xl shadow"
//             >
//               Submit Review
//             </button>
//           </div>
//         )}

//         {/* REVIEWS SECTION */}
//         <div className="space-y-6">
//           {movie.reviews.map((r, index) => (
//             <div
//               key={index}
//               className={`p-6 rounded-2xl shadow border ${
//                 theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
//               }`}
//             >
//               <p className="font-bold">{r.author}</p>
//               <p className="text-yellow-400">⭐ {r.rating}/10</p>
//               <p className="mt-2">{r.comment}</p>
//             </div>
//           ))}
//         </div>

//         {/* RELATED MOVIES */}
//         <div className="mt-10 p-6 rounded-2xl shadow-xl border">
//           <h3 className="text-2xl font-bold mb-6">Related Movies</h3>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {related.map(m => (
//               <a
//                 key={m._id}
//                 href={`/movie/${m._id}`}
//                 className="block rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] transition"
//               >
//                 <img src={m.image} className="w-full h-52 object-cover" />
//                 <div className="p-3 font-bold">{m.title}</div>
//               </a>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
//  }
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import API from "../api/api"; // your axios instance
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";

// /**
//  * MovieDetail.jsx
//  * Full review system integrated with backend:
//  * - GET /api/movies/:id
//  * - GET /api/reviews/:movieId
//  * - POST /api/reviews/:movieId        (create)
//  * - PUT /api/reviews/:reviewId        (edit)
//  * - DELETE /api/reviews/:reviewId     (delete)
//  * - POST /api/reviews/:reviewId/like
//  * - POST /api/reviews/:reviewId/dislike
//  * - POST /api/reviews/:reviewId/reply
//  *
//  * Assumes AuthContext provides `user` (object) and that token is available either as user.token or localStorage.token
//  */

// export default function MovieDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { theme } = useContext(ThemeContext);
//   const { user } = useContext(AuthContext);

//   const [movie, setMovie] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [loadingMovie, setLoadingMovie] = useState(true);
//   const [loadingReviews, setLoadingReviews] = useState(true);

//   // form states
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [rating, setRating] = useState(8);
//   const [comment, setComment] = useState("");
//   const [editing, setEditing] = useState(null); // review object being edited

//   // reply states
//   const [openReplyFor, setOpenReplyFor] = useState(null);
//   const [replyText, setReplyText] = useState("");

//   // sorting/filtering UI
//   const [sortBy, setSortBy] = useState("recent"); // recent | rating | helpful
//   const [showRatingBreakdown, setShowRatingBreakdown] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // Helper: get auth header
//   const getAuthHeader = () => {
//     const token = user?.token || localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   // Fetch movie details
//   useEffect(() => {
//     let mounted = true;
//     setLoadingMovie(true);

//     API.get(`/api/movies/${id}`)
//       .then((res) => {
//         if (!mounted) return;
//         setMovie(res.data);
//         setLoadingMovie(false);

//         // Related movies: get all movies and compute related locally
//         return API.get("/api/movies");
//       })
//       .then((resAll) => {
//         if (!mounted) return;
//         const arr = resAll?.data || [];
//         const rel = arr
//           .filter(
//             (m) =>
//               m.id !== id &&
//               m.genre &&
//               movie?.genre &&
//               m.genre.some((g) => movie.genre.includes(g))
//           )
//           .slice(0, 4);
//         setRelated(rel);
//       })
//       .catch((err) => {
//         // if movie not found or error, route back
//         console.error("Failed to load movie or related", err);
//         setLoadingMovie(false);
//         // don't auto nav away if same-page error — only navigate if 404
//         if (err?.response?.status === 404) navigate("/home");
//       });

//     return () => {
//       mounted = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   // Fetch reviews for this movie
//   useEffect(() => {
//     setLoadingReviews(true);
//     API.get(`/api/reviews/${id}`)
//       .then((res) => {
//         setReviews(res.data || []);
//         setLoadingReviews(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch reviews", err);
//         setLoadingReviews(false);
//       });
//   }, [id]);

//   // helper to refresh reviews
//   const refreshReviews = async () => {
//     try {
//       const res = await API.get(`/api/reviews/${id}`);
//       setReviews(res.data || []);
//     } catch (err) {
//       console.error("refreshReviews failed", err);
//     }
//   };

//   // Add or update review
//   const submitReview = async () => {
//     if (!user) {
//       alert("You must be logged in to post a review.");
//       return;
//     }
//     if (!comment.trim()) {
//       alert("Comment is required.");
//       return;
//     }
//     if (rating < 1 || rating > 10) {
//       alert("Rating must be 1–10.");
//       return;
//     }

//     try {
//       if (editing) {
//         // editing existing review -> PUT /api/reviews/:reviewId
//         const headers = getAuthHeader();
//         await API.put(
//           `/api/reviews/${editing._id}`,
//           { comment: comment.trim(), rating },
//           { headers }
//         );
//         setEditing(null);
//       } else {
//         // create -> POST /api/reviews/:movieId
//         const headers = getAuthHeader();
//         await API.post(
//           `/api/reviews/${id}`,
//           { comment: comment.trim(), rating },
//           { headers }
//         );
//       }
//       setComment("");
//       setRating(8);
//       setShowReviewForm(false);
//       await refreshReviews();
//     } catch (err) {
//       console.error("submitReview failed", err);
//       alert(err?.response?.data?.message || "Failed to submit review");
//     }
//   };

//   // start edit
//   const startEdit = (r) => {
//     setEditing(r);
//     setRating(r.rating);
//     setComment(r.comment);
//     setShowReviewForm(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // cancel edit
//   const cancelEdit = () => {
//     setEditing(null);
//     setRating(8);
//     setComment("");
//     setShowReviewForm(false);
//   };

//   // delete review
//   const deleteReview = async (reviewId) => {
//     if (!window.confirm("Delete this review?")) return;
//     try {
//       const headers = getAuthHeader();
//       await API.delete(`/api/reviews/${reviewId}`, { headers });
//       await refreshReviews();
//     } catch (err) {
//       console.error("deleteReview failed", err);
//       alert(err?.response?.data?.message || "Failed to delete");
//     }
//   };

//   // like/dislike
//   const toggleLike = async (reviewId) => {
//     try {
//       const headers = getAuthHeader();
//       await API.post(`/api/reviews/${reviewId}/like`, {}, { headers });
//       await refreshReviews();
//     } catch (err) {
//       console.error("toggleLike failed", err);
//     }
//   };

//   const toggleDislike = async (reviewId) => {
//     try {
//       const headers = getAuthHeader();
//       await API.post(`/api/reviews/${reviewId}/dislike`, {}, { headers });
//       await refreshReviews();
//     } catch (err) {
//       console.error("toggleDislike failed", err);
//     }
//   };

//   // reply
//   const submitReply = async (reviewId) => {
//     if (!user) {
//       alert("Login required to reply.");
//       return;
//     }
//     if (!replyText.trim()) return;
//     try {
//       const headers = getAuthHeader();
//       await API.post(
//         `/api/reviews/${reviewId}/reply`,
//         { comment: replyText.trim() },
//         { headers }
//       );
//       setReplyText("");
//       setOpenReplyFor(null);
//       await refreshReviews();
//     } catch (err) {
//       console.error("submitReply failed", err);
//     }
//   };

//   // UI helpers
//   const sortedReviews = [...reviews].sort((a, b) => {
//     if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
//     if (sortBy === "helpful") {
//       const aLikes = (a.likes || []).length;
//       const bLikes = (b.likes || []).length;
//       return bLikes - aLikes;
//     }
//     // recent default
//     return (
//       new Date(b.createdAt || b.createdAt) -
//       new Date(a.createdAt || a.createdAt)
//     );
//   });

//   if (loadingMovie) {
//     return <div className="p-10 text-center text-xl">Loading movie...</div>;
//   }

//   if (!movie) {
//     return <div className="p-6 text-center">Movie not found.</div>;
//   }

//   // rating breakdown
//   const ratingCounts = {};
//   for (let i = 1; i <= 10; i++) ratingCounts[i] = 0;
//   reviews.forEach((r) => {
//     const rt = Number(r.rating) || 0;
//     if (rt >= 1 && rt <= 10) ratingCounts[rt] = (ratingCounts[rt] || 0) + 1;
//   });
//   const totalReviews = reviews.length || 0;

//   const pageBg =
//     theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
//   const panelBg =
//     theme === "dark"
//       ? "bg-gray-800 border-gray-700"
//       : "bg-white border-gray-200";
//   const subtleText = theme === "dark" ? "text-gray-400" : "text-gray-600";

//   return (
//     <div className={`${pageBg} min-h-screen p-6`}>
//       <div className="max-w-6xl mx-auto space-y-10">
//         {/* Top grid: trailer + details */}
//         <div className="grid md:grid-cols-2 gap-10">
//           {/* Trailer */}
//           <div className={`p-6 rounded-2xl shadow-xl border-2 ${panelBg}`}>
//             <div className="flex items-start justify-between">
//               <h2 className="text-2xl font-bold animate-pulse">Trailer</h2>
             

//               <button
//                 onClick={() => {
//                   const favs = JSON.parse(
//                     localStorage.getItem("mra_favorites") || "[]"
//                   );
//                   if (favs.includes(movie.id)) {
//                     localStorage.setItem(
//                       "mra_favorites",
//                       JSON.stringify(favs.filter((f) => f !== movie.id))
//                     );
//                     setIsFavorite(false);
//                   } else {
//                     localStorage.setItem(
//                       "mra_favorites",
//                       JSON.stringify([...favs, movie.id])
//                     );
//                     setIsFavorite(true);
//                   }
//                 }}

//                 className={`px-4 py-1 rounded-md font-semibold ${
//                   isFavorite
//                     ? "bg-yellow-400 text-black"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {isFavorite ? "★ Favorited" : "☆ Favorite"}
//               </button>
//             </div>


//             <div className="mt-4 relative rounded-xl overflow-hidden shadow-md h-[420px]">
//               <iframe
//                 src={movie.trailerUrl}
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//                 title={`${movie.title} trailer`}
//                 className="absolute inset-0 w-full h-full"
//               />
//             </div>
//           </div>

//           {/* Details */}
//           <div className={`p-6 rounded-2xl shadow-xl border-2 ${panelBg}`}>
//             <h1 className="text-3xl font-extrabold">{movie.title}</h1>
//             <p className="text-indigo-400 mt-2">
//               {(movie.genre || []).join(", ")}
//             </p>

//             <div className="mt-3 space-y-1">
//               <p>
//                 <strong>Year:</strong> {movie.year}
//               </p>
//               <p>
//                 <strong>Duration:</strong> {movie.duration} min
//               </p>
//               <p>
//                 <strong>Director:</strong> {movie.director}
//               </p>
//               <p>
//                 <strong>Language:</strong> {movie.language}
//               </p>
//             </div>

//             <p className="mt-4">{movie.description}</p>

//             <p className="text-yellow-400 text-xl font-bold mt-3">
//               ⭐ {movie.rating}/10
//             </p>

//             <h3 className="text-xl font-bold mt-6">Cast:</h3>
//             <p className="text-lg font-semibold">
//               {(movie.cast || []).join("  ")}
//             </p>

//             <div className="mt-6 flex gap-4">
//               <button
//                 onClick={() => {
//                   setShowReviewForm((s) => !s);
//                   if (editing) cancelEdit();
//                 }}
//                 className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700"
//               >
//                 {showReviewForm
//                   ? "Close Review"
//                   : editing
//                   ? "Edit Review"
//                   : "Write a Review"}
//               </button>

//               <button
//                 onClick={() => setShowRatingBreakdown((s) => !s)}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
//               >
//                 {showRatingBreakdown
//                   ? "Hide Rating Breakdown"
//                   : "Show Rating Breakdown"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Review form */}
//         {showReviewForm && (
//           <div className={`p-6 rounded-2xl shadow-xl border ${panelBg}`}>
//             <h3 className="text-2xl font-bold mb-4">
//               {editing ? "Edit your review" : "Write a review"}
//             </h3>

//             <div className="flex gap-4 items-center mb-4">
//               <label className="font-semibold">Rating</label>
//               <select
//                 value={rating}
//                 onChange={(e) => setRating(Number(e.target.value))}
//                 className="p-2 rounded-lg border"
//               >
//                 {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
//                   <option key={n} value={n}>
//                     {n}/10
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               rows={6}
//               placeholder="Share your thoughts..."
//               className="w-full p-4 rounded-xl border mb-4"
//             />

//             <div className="flex gap-3">
//               <button
//                 onClick={submitReview}
//                 className="px-6 py-3 bg-green-600 text-white rounded-xl"
//               >
//                 Submit
//               </button>
//               {editing && (
//                 <button
//                   onClick={cancelEdit}
//                   className="px-6 py-3 bg-gray-300 rounded-xl"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Rating breakdown */}
//         {showRatingBreakdown && (
//           <div className={`p-6 rounded-2xl shadow-2xl  ${panelBg}`}>
//             <h3 className="text-2xl font-extrabold mb-4 ">Rating Breakdown</h3>
//             <div className="space-y-4">
//               {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((s) => {
//                 const count = ratingCounts[s] || 0;
//                 const percent = totalReviews
//                   ? Math.round((count / totalReviews) * 100)
//                   : 0;
//                 return (
//                   <div key={s}>
//                     <div className="flex justify-between text-sm mb-1">
//                       <span>{s}/10</span>
//                       <span className="font-semibold">{percent}%</span>
//                     </div>
//                     <div
//                       className={`${
//                         theme === "dark" ? "bg-gray-800" : "bg-gray-200"
//                       } w-full h-3 rounded-full overflow-hidden`}
//                     >
//                       <div
//                         style={{ width: `${percent}%` }}
//                         className={`h-full rounded-full ${
//                           s >= 8
//                             ? "bg-green-500"
//                             : s >= 5
//                             ? "bg-yellow-400"
//                             : "bg-red-500"
//                         }`}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Reviews header + sort */}
//         <div className="flex items-center justify-between">
//           <h3 className="text-2xl font-bold">Reviews ({reviews.length})</h3>
//           <div className="flex items-center gap-3">
//             <label className="text-sm">Sort</label>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="p-2 rounded-lg border"
//             >
//               <option value="recent">Newest</option>
//               <option value="rating">Highest Rated</option>
//               <option value="helpful">Most Helpful</option>
//             </select>
//           </div>
//         </div>

//         {/* Reviews list */}
//         <div className="space-y-6">
//           {loadingReviews ? (
//             <div className="text-center py-10">Loading reviews...</div>
//           ) : sortedReviews.length === 0 ? (
//             <div className="text-center py-10 text-gray-500">
//               No reviews yet. Be the first to review.
//             </div>
//           ) : (
//             sortedReviews.map((r) => (
//               <div
//                 key={r._id || r.id}
//                 className={`p-6 rounded-2xl shadow ${panelBg} relative`}
//               >
//                 {/* header */}
//                 <div className="flex items-center gap-3 mb-3">
//                   <div
//                     className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
//                       theme === "dark"
//                         ? "bg-indigo-500 text-white"
//                         : "bg-indigo-100 text-indigo-700"
//                     }`}
//                   >
//                     {(r.author || r.userId || "U").charAt(0).toUpperCase()}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold">{r.author || "Anonymous"}</p>
//                     <p className={`text-xs ${subtleText}`}>
//                       {new Date(r.createdAt || r.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="text-yellow-400 font-bold">
//                     ⭐ {r.rating}/10
//                   </div>
//                 </div>

//                 {/* comment */}
//                 <p
//                   className={`italic border-l-4 pl-4 ${
//                     theme === "dark"
//                       ? "border-indigo-400 text-gray-300"
//                       : "border-indigo-600 text-gray-700"
//                   }`}
//                 >
//                   {r.comment}
//                 </p>

//                 {/* replies */}
//                 <div className="mt-4 space-y-3">
//                   {(r.replies || []).map((rep, idx) => (
//                     <div
//                       key={idx}
//                       className={`p-3 rounded-lg ${
//                         theme === "dark"
//                           ? "bg-gray-800 border-gray-700 text-white"
//                           : "bg-gray-100 border-gray-200 text-black"
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-semibold text-sm">
//                             {rep.author || "User"}
//                           </p>
//                           <p className={`text-xs ${subtleText}`}>
//                             {new Date(rep.createdAt).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                       <p className="mt-2">{rep.comment}</p>
//                     </div>
//                   ))}

//                   {/* reply input UI */}
//                   {openReplyFor === (r._id || r.id) ? (
//                     <div className="flex gap-2 mt-2">
//                       <input
//                         value={replyText}
//                         onChange={(e) => setReplyText(e.target.value)}
//                         className={`flex-1 p-2 rounded-md border ${
//                           theme === "dark"
//                             ? "bg-gray-700 text-white border-gray-600"
//                             : "bg-white text-black border-gray-300"
//                         }`}
//                         placeholder="Write a reply..."
//                       />
//                       <button
//                         onClick={() => submitReply(r._id || r.id)}
//                         className="px-4 py-2 bg-indigo-600 text-white rounded-md"
//                       >
//                         Reply
//                       </button>
//                       <button
//                         onClick={() => {
//                           setOpenReplyFor(null);
//                           setReplyText("");
//                         }}
//                         className="px-4 py-2 rounded-md bg-gray-300"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => setOpenReplyFor(r._id || r.id)}
//                       className={`text-sm mt-2 ${
//                         theme === "dark" ? "text-indigo-300" : "text-indigo-600"
//                       }`}
//                     >
//                       Reply
//                     </button>
//                   )}
//                 </div>

//                 {/* actions: like/dislike/edit/delete */}
//                 <div className="flex gap-4 mt-4 text-lg">
//                   <button
//                     onClick={() => toggleLike(r._id || r.id)}
//                     className={`${
//                       theme === "dark" ? "text-green-400" : "text-green-600"
//                     } hover:scale-110 transition`}
//                   >
//                     👍 {(r.likes || []).length}
//                   </button>
//                   <button
//                     onClick={() => toggleDislike(r._id || r.id)}
//                     className={`${
//                       theme === "dark" ? "text-red-400" : "text-red-600"
//                     } hover:scale-110 transition`}
//                   >
//                     👎 {(r.dislikes || []).length}
//                   </button>
//                 </div>

//                 {user &&
//                   (user.id === r.userId ||
//                     user._id === r.userId ||
//                     user.email === r.author) && (
//                     <div className="absolute top-4 right-4 flex gap-3 text-sm">
//                       <button
//                         className={
//                           theme === "dark"
//                             ? "text-indigo-300"
//                             : "text-indigo-600"
//                         }
//                         onClick={() => startEdit(r)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className={
//                           theme === "dark" ? "text-red-400" : "text-red-600"
//                         }
//                         onClick={() => deleteReview(r._id || r.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//               </div>
//             ))
//           )}
//         </div>
// {/* Related Movies */}
// <div className={`p-6 rounded-2xl shadow-xl border-2 ${panelBg}`}>
//   <h3 className="text-2xl font-bold mb-4">Related Movies</h3>

//   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//     {related.map((m) => (
//       <Link
//         key={m.id}
//         to={`/movie/${m.id}`}    // <-- FIXED
//         className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:scale-[1.03]"
//       >
//         <img
//           src={m.image}
//           className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
//           alt={m.title}
//         />

//         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

//         <div className="absolute bottom-3 left-3 right-3">
//           <p className="text-white text-lg font-bold tracking-wide group-hover:text-yellow-300 transition">
//             {m.title}
//           </p>
//           <p className="text-gray-200 text-xs mt-1 group-hover:text-gray-100 transition">
//             {(m.genre || []).slice(0, 2).join(", ")}
//           </p>
//         </div>
//       </Link>
//     ))}
//   </div>
// </div>
//  </div>
//     </div>
//   );
// }
// src/pages/MovieDetail.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import API from "../api/api"; // default axios instance (must exist)
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";

// export default function MovieDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { theme } = useContext(ThemeContext);
//   const { user } = useContext(AuthContext);

//   const [movie, setMovie] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [loadingMovie, setLoadingMovie] = useState(true);
//   const [loadingReviews, setLoadingReviews] = useState(true);

//   // review form / edit / reply
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [rating, setRating] = useState(8);
//   const [comment, setComment] = useState("");
//   const [editing, setEditing] = useState(null); // editing review object
//   const [openReplyFor, setOpenReplyFor] = useState(null);
//   const [replyText, setReplyText] = useState("");

//   const [sortBy, setSortBy] = useState("recent"); // recent | rating | helpful
//   const [showRatingBreakdown, setShowRatingBreakdown] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // helpers
//   const getAuthHeader = () => {
//     const token = user?.token || localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   };

//   // Fetch movie and related
//   useEffect(() => {
//     let mounted = true;
//     setLoadingMovie(true);
//     setMovie(null);
//     setRelated([]);

//     API.get(`/api/movies/${id}`)
//       .then((res) => {
//         if (!mounted) return;
//         setMovie(res.data);
//         setLoadingMovie(false);

//         // get all movies and compute related locally
//         return API.get("/api/movies");
//       })
//       .then((resAll) => {
//         if (!mounted) return;
//         const arr = resAll?.data || [];
//         // use numeric id field string equality (your db uses id string)
//         const rel = arr
//           .filter(
//             (m) =>
//               m.id !== id &&
//               Array.isArray(m.genre) &&
//               Array.isArray(resAll?.data?.find(mm => mm.id === id)?.genre) // just to be safe
//           )
//           .filter((m) => {
//             if (!movie || !movie.genre) return false;
//             return Array.isArray(m.genre) && m.genre.some((g) => movie.genre.includes(g));
//           })
//           .slice(0, 4);
//         // fallback: if movie.genre was fetched but movie state hasn't updated yet, recompute using resAll and movie id
//         setRelated(rel);
//       })
//       .catch((err) => {
//         console.error("Failed to load movie or related", err);
//         setLoadingMovie(false);
//         if (err?.response?.status === 404) navigate("/home");
//       });

//     return () => (mounted = false);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]); // intentionally only depend on id

//   // Fetch reviews for this movie (from /api/reviews/:movieId)
//   useEffect(() => {
//     let mounted = true;
//     setLoadingReviews(true);
//     API.get(`/api/reviews/${id}`)
//       .then((res) => {
//         if (!mounted) return;
//         setReviews(res.data || []);
//         setLoadingReviews(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch reviews", err);
//         setLoadingReviews(false);
//       });
//     return () => (mounted = false);
//   }, [id]);

//   // helper to refresh reviews
//   const refreshReviews = async () => {
//     try {
//       const res = await API.get(`/api/reviews/${id}`);
//       setReviews(res.data || []);
//     } catch (err) {
//       console.error("refreshReviews failed", err);
//     }
//   };

//   // submit review (create or edit)
//   const submitReview = async () => {
//     if (!user) {
//       alert("You must be logged in to post a review.");
//       return;
//     }
//     if (!comment.trim()) {
//       alert("Comment is required.");
//       return;
//     }
//     if (rating < 1 || rating > 10) {
//       alert("Rating must be 1–10.");
//       return;
//     }

//     try {
//       const headers = getAuthHeader();
//       if (editing) {
//         // editing existing review
//         await API.put(`/api/reviews/${editing._id || editing.id}`, { comment: comment.trim(), rating }, { headers });
//         setEditing(null);
//       } else {
//         // create
//         await API.post(`/api/reviews/${id}`, { comment: comment.trim(), rating }, { headers });
//       }
//       setComment("");
//       setRating(8);
//       setShowReviewForm(false);
//       await refreshReviews();
//     } catch (err) {
//       console.error("submitReview failed", err);
//       alert(err?.response?.data?.message || "Failed to submit review");
//     }
//   };

//   // start editing an existing review
//   const startEdit = (r) => {
//     setEditing(r);
//     setRating(Number(r.rating) || 8);
//     setComment(r.comment || "");
//     setShowReviewForm(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const cancelEdit = () => {
//     setEditing(null);
//     setRating(8);
//     setComment("");
//     setShowReviewForm(false);
//   };

//   // delete
//   const deleteReview = async (reviewId) => {
//     if (!window.confirm("Delete this review?")) return;
//     try {
//       const headers = getAuthHeader();
//       await API.delete(`/api/reviews/${reviewId}`, { headers });
//       await refreshReviews();
//     } catch (err) {
//       console.error("deleteReview failed", err);
//       alert(err?.response?.data?.message || "Failed to delete");
//     }
//   };

//   // like / dislike
//   const toggleLike = async (reviewId) => {
//     try {
//       const headers = getAuthHeader();
//       await API.post(`/api/reviews/${reviewId}/like`, {}, { headers });
//       await refreshReviews();
//     } catch (err) {
//       console.error("toggleLike failed", err);
//     }
//   };
//   const toggleDislike = async (reviewId) => {
//     try {
//       const headers = getAuthHeader();
//       await API.post(`/api/reviews/${reviewId}/dislike`, {}, { headers });
//       await refreshReviews();
//     } catch (err) {
//       console.error("toggleDislike failed", err);
//     }
//   };

//   // reply
//   const submitReply = async (reviewId) => {
//     if (!user) {
//       alert("Login required to reply.");
//       return;
//     }
//     if (!replyText.trim()) return;
//     try {
//       const headers = getAuthHeader();
//       await API.post(`/api/reviews/${reviewId}/reply`, { comment: replyText.trim() }, { headers });
//       setReplyText("");
//       setOpenReplyFor(null);
//       await refreshReviews();
//     } catch (err) {
//       console.error("submitReply failed", err);
//     }
//   };

//   // sorted reviews view
//   const sortedReviews = [...reviews].sort((a, b) => {
//     if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
//     if (sortBy === "helpful") {
//       const aLikes = (a.likes || []).length;
//       const bLikes = (b.likes || []).length;
//       return bLikes - aLikes;
//     }
//     // recent
//     return new Date(b.createdAt || b.createdAt) - new Date(a.createdAt || a.createdAt);
//   });

//   if (loadingMovie) {
//     return <div className="p-10 text-center text-xl">Loading movie...</div>;
//   }

//   if (!movie) {
//     return <div className="p-6 text-center">Movie not found.</div>;
//   }

//   // rating breakdown counts
//   const ratingCounts = {};
//   for (let i = 1; i <= 10; i++) ratingCounts[i] = 0;
//   reviews.forEach((r) => {
//     const rt = Number(r.rating) || 0;
//     if (rt >= 1 && rt <= 10) ratingCounts[rt] = (ratingCounts[rt] || 0) + 1;
//   });
//   const totalReviews = reviews.length || 0;

//   const pageBg = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
//   const panelBg = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
//   const subtleText = theme === "dark" ? "text-gray-400" : "text-gray-600";

//   return (
//     <div className={`${pageBg} min-h-screen p-6`}>
//       <div className="max-w-6xl mx-auto space-y-10">
//         {/* Top grid */}
//         <div className="grid md:grid-cols-2 gap-10">
//           {/* Trailer */}
//           <div className={`p-6 rounded-2xl shadow-xl border-2 ${panelBg}`}>
//             <div className="flex items-start justify-between">
//               <h2 className="text-2xl font-bold animate-pulse">Trailer</h2>
//               <button
//                 onClick={() => {
//                   const favs = JSON.parse(localStorage.getItem("mra_favorites") || "[]");
//                   if (favs.includes(movie.id)) {
//                     localStorage.setItem("mra_favorites", JSON.stringify(favs.filter((f) => f !== movie.id)));
//                     setIsFavorite(false);
//                   } else {
//                     localStorage.setItem("mra_favorites", JSON.stringify([...favs, movie.id]));
//                     setIsFavorite(true);
//                   }
//                 }}
//                 className={`px-4 py-1 rounded-md font-semibold ${isFavorite ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-800"}`}
//               >
//                 {isFavorite ? "★ Favorited" : "☆ Favorite"}
//               </button>
//             </div>

//             <div className="mt-4 relative rounded-xl overflow-hidden shadow-md h-[420px]">
//               <iframe
//                 src={movie.trailerUrl}
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//                 title={`${movie.title} trailer`}
//                 className="absolute inset-0 w-full h-full"
//               />
//             </div>
//           </div>

//           {/* Details */}
//           <div className={`p-6 rounded-2xl shadow-xl border-2 ${panelBg}`}>
//             <h1 className="text-3xl font-extrabold">{movie.title}</h1>
//             <p className="text-indigo-400 mt-2">{(movie.genre || []).join(", ")}</p>

//             <div className="mt-3 space-y-1">
//               <p><strong>Year:</strong> {movie.year}</p>
//               <p><strong>Duration:</strong> {movie.duration} min</p>
//               <p><strong>Director:</strong> {movie.director}</p>
//               <p><strong>Language:</strong> {movie.language}</p>
//             </div>

//             <p className="mt-4">{movie.description}</p>

//             <p className="text-yellow-400 text-xl font-bold mt-3">⭐ {movie.rating}/10</p>

//             <h3 className="text-xl font-bold mt-6">Cast:</h3>
//             <p className="text-lg font-semibold">{(movie.cast || []).join("  ")}</p>

//             <div className="mt-6 flex gap-4">
//               <button
//                 onClick={() => {
//                   setShowReviewForm((s) => !s);
//                   if (editing) cancelEdit();
//                 }}
//                 className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700"
//               >
//                 {showReviewForm ? "Close Review" : editing ? "Edit Review" : "Write a Review"}
//               </button>

//               <button onClick={() => setShowRatingBreakdown((s) => !s)} className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
//                 {showRatingBreakdown ? "Hide Rating Breakdown" : "Show Rating Breakdown"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Review form */}
//         {showReviewForm && (
//           <div className={`p-6 rounded-2xl shadow-xl border ${panelBg}`}>
//             <h3 className="text-2xl font-bold mb-4">{editing ? "Edit your review" : "Write a review"}</h3>

//             <div className="flex gap-4 items-center mb-4">
//               <label className="font-semibold">Rating</label>
//               <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="p-2 rounded-lg border">
//                 {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n}/10</option>)}
//               </select>
//             </div>

//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               rows={6}
//               placeholder="Share your thoughts..."
//               className="w-full p-4 rounded-xl border mb-4"
//             />

//             <div className="flex gap-3">
//               <button onClick={submitReview} className="px-6 py-3 bg-green-600 text-white rounded-xl">Submit</button>
//               {editing && <button onClick={cancelEdit} className="px-6 py-3 bg-gray-300 rounded-xl">Cancel</button>}
//             </div>
//           </div>
//         )}

//         {/* Rating breakdown */}
//         {showRatingBreakdown && (
//           <div className={`p-6 rounded-2xl shadow-2xl ${panelBg}`}>
//             <h3 className="text-2xl font-extrabold mb-4">Rating Breakdown</h3>
//             <div className="space-y-4">
//               {[10,9,8,7,6,5,4,3,2,1].map((s) => {
//                 const count = ratingCounts[s] || 0;
//                 const percent = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
//                 return (
//                   <div key={s}>
//                     <div className="flex justify-between text-sm mb-1">
//                       <span>{s}/10</span>
//                       <span className="font-semibold">{percent}%</span>
//                     </div>
//                     <div className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} w-full h-3 rounded-full overflow-hidden`}>
//                       <div style={{ width: `${percent}%` }} className={`h-full rounded-full ${s >= 8 ? "bg-green-500" : s >= 5 ? "bg-yellow-400" : "bg-red-500"}`} />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Reviews header + sort */}
//         <div className="flex items-center justify-between">
//           <h3 className="text-2xl font-bold">Reviews ({reviews.length})</h3>
//           <div className="flex items-center gap-3">
//             <label className="text-sm">Sort</label>
//             <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 rounded-lg border">
//               <option value="recent">Newest</option>
//               <option value="rating">Highest Rated</option>
//               <option value="helpful">Most Helpful</option>
//             </select>
//           </div>
//         </div>

//         {/* Reviews list */}
//         <div className="space-y-6">
//           {loadingReviews ? (
//             <div className="text-center py-10">Loading reviews...</div>
//           ) : sortedReviews.length === 0 ? (
//             <div className="text-center py-10 text-gray-500">No reviews yet. Be the first to review.</div>
//           ) : (
//             sortedReviews.map((r) => (
//               <div key={r._id || r.id} className={`p-6 rounded-2xl shadow ${panelBg} relative`}>
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${theme === "dark" ? "bg-indigo-500 text-white" : "bg-indigo-100 text-indigo-700"}`}>
//                     {(r.author || r.userId || "U").charAt(0).toUpperCase()}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold">{r.author || "Anonymous"}</p>
//                     <p className={`text-xs ${subtleText}`}>{new Date(r.createdAt || r.createdAt).toLocaleString()}</p>
//                   </div>
//                   <div className="text-yellow-400 font-bold">⭐ {r.rating}/10</div>
//                 </div>

//                 <p className={`italic border-l-4 pl-4 ${theme === "dark" ? "border-indigo-400 text-gray-300" : "border-indigo-600 text-gray-700"}`}>
//                   {r.comment}
//                 </p>

//                 <div className="mt-4 space-y-3">
//                   {(r.replies || []).map((rep, idx) => (
//                     <div key={idx} className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-100 border-gray-200 text-black"}`}>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-semibold text-sm">{rep.author || "User"}</p>
//                           <p className={`text-xs ${subtleText}`}>{new Date(rep.createdAt).toLocaleString()}</p>
//                         </div>
//                       </div>
//                       <p className="mt-2">{rep.comment}</p>
//                     </div>
//                   ))}

//                   {openReplyFor === (r._id || r.id) ? (
//                     <div className="flex gap-2 mt-2">
//                       <input value={replyText} onChange={(e) => setReplyText(e.target.value)} className={`flex-1 p-2 rounded-md border ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`} placeholder="Write a reply..." />
//                       <button onClick={() => submitReply(r._id || r.id)} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Reply</button>
//                       <button onClick={() => { setOpenReplyFor(null); setReplyText(""); }} className="px-4 py-2 rounded-md bg-gray-300">Cancel</button>
//                     </div>
//                   ) : (
//                     <button onClick={() => setOpenReplyFor(r._id || r.id)} className={`text-sm mt-2 ${theme === "dark" ? "text-indigo-300" : "text-indigo-600"}`}>Reply</button>
//                   )}
//                 </div>

//                 <div className="flex gap-4 mt-4 text-lg">
//                   <button onClick={() => toggleLike(r._id || r.id)} className={`${theme === "dark" ? "text-green-400" : "text-green-600"} hover:scale-110 transition`}>👍 {(r.likes || []).length}</button>
//                   <button onClick={() => toggleDislike(r._id || r.id)} className={`${theme === "dark" ? "text-red-400" : "text-red-600"} hover:scale-110 transition`}>👎 {(r.dislikes || []).length}</button>
//                 </div>

//                 {user && (user.id === r.userId || user._id === r.userId || user.email === r.author) && (
//                   <div className="absolute top-4 right-4 flex gap-3 text-sm">
//                     <button className={theme === "dark" ? "text-indigo-300" : "text-indigo-600"} onClick={() => startEdit(r)}>Edit</button>
//                     <button className={theme === "dark" ? "text-red-400" : "text-red-600"} onClick={() => deleteReview(r._id || r.id)}>Delete</button>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         {/* Related movies */}
//         <div className={`p-6 rounded-2xl shadow-xl border-2 ${panelBg}`}>
//           <h3 className="text-2xl font-bold mb-4">Related Movies</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {related.map((m) => (
//               <Link key={m.id} to={`/movie/${m.id}`} className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:scale-[1.03]">
//                 <img src={m.image} alt={m.title} className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500" />
//                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
//                 <div className="absolute bottom-3 left-3 right-3">
//                   <p className="text-white text-lg font-bold tracking-wide group-hover:text-yellow-300 transition">{m.title}</p>
//                   <p className="text-gray-200 text-xs mt-1 group-hover:text-gray-100 transition">{(m.genre || []).slice(0, 2).join(", ")}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/MovieDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/api"; // default axios instance
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";


export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(8);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(null); // editing review object

  // Reply state
  const [openReplyFor, setOpenReplyFor] = useState(null);
  const [replyText, setReplyText] = useState("");

  // UI
  const [sortBy, setSortBy] = useState("recent"); // recent | rating | helpful
  const [showRatingBreakdown, setShowRatingBreakdown] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // helper: authorization header
  const getAuthHeader = () => {
    const token = user?.token || localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch movie + related
useEffect(() => {
  let mounted = true;
  setLoadingMovie(true);
  setMovie(null);
  setRelated([]);

  API.get(`/api/movies/${id}`)
    .then((res) => {
      if (!mounted) return;
      const currentMovie = res.data;
      setMovie(currentMovie);
      setLoadingMovie(false);

      return API.get("/api/movies");
    })
    .then((allRes) => {
      if (!mounted) return;
      const all = allRes?.data || [];

      const relatedMovies = all.filter((m) => {
        if (String(m.id) === String(id)) return false;

        const g1 = Array.isArray(movie.genre)
          ? movie.genre.map((x) => x.toLowerCase())
          : [String(movie.genre || "").toLowerCase()];

        const g2 = Array.isArray(m.genre)
          ? m.genre.map((x) => x.toLowerCase())
          : [String(m.genre || "").toLowerCase()];

        return g1.some((g) => g2.includes(g));
      });

      setRelated(relatedMovies.slice(0, 4));
    })
    .catch((err) => {
      console.error("Failed to load movie or related", err);
      setLoadingMovie(false);
    });

  return () => (mounted = false);
}, [id]);

  // Fetch reviews
  useEffect(() => {
    let mounted = true;
    setLoadingReviews(true);

    API.get(`/api/reviews/${id}`)
      .then((res) => {
        if (!mounted) return;
        setReviews(res.data || []);
        setLoadingReviews(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
        setLoadingReviews(false);
      });

    return () => (mounted = false);
  }, [id]);

  // helper: refresh reviews
  const refreshReviews = async () => {
    try {
      const res = await API.get(`/api/reviews/${id}`);
      setReviews(res.data || []);
    } catch (err) {
      console.error("refreshReviews failed", err);
    }
  };

  // Submit review (create or edit)
  const submitReview = async () => {
    if (!user) {
      alert("You must be logged in to post a review.");
      return;
    }
    if (!comment.trim()) {
      alert("Comment is required.");
      return;
    }
    if (rating < 1 || rating > 10) {
      alert("Rating must be between 1 and 10.");
      return;
    }

    try {
      const headers = getAuthHeader();
      if (editing) {
        // update
        await API.put(`/api/reviews/${editing._id || editing.id}`, { comment: comment.trim(), rating }, { headers });
        setEditing(null);
      } else {
        // create
        await API.post(`/api/reviews/${id}`, { comment: comment.trim(), rating }, { headers });
      }

      setComment("");
      setRating(8);
      setShowReviewForm(false);
      await refreshReviews();
    } catch (err) {
      console.error("submitReview failed", err);
      alert(err?.response?.data?.message || "Failed to submit review");
    }
  };

  const startEdit = (r) => {
    setEditing(r);
    setRating(Number(r.rating) || 8);
    setComment(r.comment || "");
    setShowReviewForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditing(null);
    setRating(8);
    setComment("");
    setShowReviewForm(false);
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      const headers = getAuthHeader();
      await API.delete(`/api/reviews/${reviewId}`, { headers });
      await refreshReviews();
    } catch (err) {
      console.error("deleteReview failed", err);
      alert(err?.response?.data?.message || "Failed to delete review");
    }
  };

  const toggleLike = async (reviewId) => {
    try {
      const headers = getAuthHeader();
      await API.post(`/api/reviews/${reviewId}/like`, {}, { headers });
      await refreshReviews();
    } catch (err) {
      console.error("toggleLike failed", err);
    }
  };

  const toggleDislike = async (reviewId) => {
    try {
      const headers = getAuthHeader();
      await API.post(`/api/reviews/${reviewId}/dislike`, {}, { headers });
      await refreshReviews();
    } catch (err) {
      console.error("toggleDislike failed", err);
    }
  };

  const submitReply = async (reviewId) => {
    if (!user) {
      alert("Login required to reply.");
      return;
    }
    if (!replyText.trim()) return;
    try {
      const headers = getAuthHeader();
      await API.post(`/api/reviews/${reviewId}/reply`, { comment: replyText.trim() }, { headers });
      setReplyText("");
      setOpenReplyFor(null);
      await refreshReviews();
    } catch (err) {
      console.error("submitReply failed", err);
    }
  };

  // rating breakdown computation
  const ratingCounts = {};
  for (let i = 1; i <= 10; i++) ratingCounts[i] = 0;
  reviews.forEach((r) => {
    const rt = Number(r.rating) || 0;
    if (rt >= 1 && rt <= 10) ratingCounts[rt] = (ratingCounts[rt] || 0) + 1;
  });
  const totalReviews = reviews.length || 0;

  // sorted reviews view
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "helpful") {
      const aLikes = (a.likes || []).length;
      const bLikes = (b.likes || []).length;
      return bLikes - aLikes;
    }
    // recent
    return new Date(b.createdAt || b.createdAt) - new Date(a.createdAt || a.createdAt);
  });

  // UI classes
  const pageBg = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
  const panelBg = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const subtleText = theme === "dark" ? "text-gray-400" : "text-gray-600";

  if (loadingMovie) return <div className="p-10 text-center text-xl">Loading movie...</div>;
  if (!movie) return <div className="p-6 text-center">Movie not found.</div>;

  return (
    <div className={`${pageBg} min-h-screen p-6`}>
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Top grid: trailer + details */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* trailer */}
          <div className={`p-6 rounded-2xl shadow-xl border-2 ${panelBg}`}>
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold animate-pulse">Trailer</h2>

              {/* <button
                onClick={() => {
                  const favs = JSON.parse(localStorage.getItem("mra_favorites") || "[]");
                  if (favs.includes(movie.id)) {
                    localStorage.setItem("mra_favorites", JSON.stringify(favs.filter((f) => f !== movie.id)));
                    setIsFavorite(false);
                  } else {
                    localStorage.setItem("mra_favorites", JSON.stringify([...favs, movie.id]));
                    setIsFavorite(true);
                  }
                }}
                className={`px-4 py-1 rounded-md font-semibold ${isFavorite ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-800"}`}
              >
                {isFavorite ? "★ Favorited" : "☆ Favorite"}
              </button>
            </div> */}
            <button
  onClick={() => {
    const favs = JSON.parse(localStorage.getItem("mra_favorites") || "[]");
    const realId = movie._id; // <-- USE BACKEND ID

    if (favs.includes(realId)) {
      // Remove
      const updated = favs.filter((f) => f !== realId);
      localStorage.setItem("mra_favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      // Add
      const updated = [...favs, realId];
      localStorage.setItem("mra_favorites", JSON.stringify(updated));
      setIsFavorite(true);
    }
  }}
  className={`px-4 py-1 rounded-md font-semibold ${
    isFavorite ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-800"
  }`}
>
  {isFavorite ? "★ Favorited" : "☆ Favorite"}
</button>
</div>

            <div className="mt-4 relative rounded-xl overflow-hidden shadow-md h-[420px]">
              {/* autoplay handled by provider (YouTube embed respects query params) - movie.trailerUrl should include embed link */}
              <iframe
                src={movie.trailerUrl}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`${movie.title} trailer`}
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* details */}
          <div className={`p-6 rounded-2xl shadow-xl border-2 ${panelBg}`}>
            <h1 className="text-3xl font-extrabold">{movie.title}</h1>
            <p className="text-indigo-400 mt-2">{(movie.genre || []).join(", ")}</p>

            <div className="mt-3 space-y-1">
              <p><strong>Year:</strong> {movie.year}</p>
              <p><strong>Duration:</strong> {movie.duration} min</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Language:</strong> {movie.language}</p>
            </div>

            <p className="mt-4">{movie.description}</p>

            <p className="text-yellow-400 text-xl font-bold mt-3">⭐ {movie.rating}/10</p>

            <h3 className="text-xl font-bold mt-6">Cast:</h3>
            <p className="text-lg font-semibold">{(movie.cast || []).join("  ")}</p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  setShowReviewForm((s) => !s);
                  if (editing) cancelEdit();
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700"
              >
                {showReviewForm ? "Close Review" : editing ? "Edit Review" : "Write a Review"}
              </button>

              <button onClick={() => setShowRatingBreakdown((s) => !s)} className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
                {showRatingBreakdown ? "Hide Rating Breakdown" : "Show Rating Breakdown"}
              </button>
            </div>
          </div>
        </div>

        {/* review form */}
        {showReviewForm && (
          <div className={`p-6 rounded-2xl shadow-xl border ${panelBg}`}>
            <h3 className="text-2xl font-bold mb-4">{editing ? "Edit your review" : "Write a review"}</h3>

            <div className="flex gap-4 items-center mb-4">
              <label className="font-semibold">Rating</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="p-2 rounded-lg border">
                {[10,9,8,7,6,5,4,3,2,1].map((n) => <option key={n} value={n}>{n}/10</option>)}
              </select>
            </div>

            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={6} placeholder="Share your thoughts..." className="w-full p-4 rounded-xl border mb-4" />

            <div className="flex gap-3">
              <button onClick={submitReview} className="px-6 py-3 bg-green-600 text-white rounded-xl">Submit</button>
              {editing && <button onClick={cancelEdit} className="px-6 py-3 bg-gray-300 rounded-xl">Cancel</button>}
            </div>
          </div>
        )}

        {/* rating breakdown */}
        {showRatingBreakdown && (
          <div className={`p-6 rounded-2xl shadow-2xl ${panelBg}`}>
            <h3 className="text-2xl font-extrabold mb-4">Rating Breakdown</h3>
            <div className="space-y-4">
              {[10,9,8,7,6,5,4,3,2,1].map((s) => {
                const count = ratingCounts[s] || 0;
                const percent = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
                return (
                  <div key={s}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{s}/10</span>
                      <span className="font-semibold">{percent}%</span>
                    </div>
                    <div className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} w-full h-3 rounded-full overflow-hidden`}>
                      <div style={{ width: `${percent}%` }} className={`h-full rounded-full ${s >= 8 ? "bg-green-500" : s >= 5 ? "bg-yellow-400" : "bg-red-500"}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* reviews + sort */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Reviews ({reviews.length})</h3>
          <div className="flex items-center gap-3">
            <label className="text-sm">Sort</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 rounded-lg border">
              <option value="recent">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* reviews list */}
        <div className="space-y-6">
          {loadingReviews ? (
            <div className="text-center py-10">Loading reviews...</div>
          ) : sortedReviews.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No reviews yet. Be the first to review.</div>
          ) : (
            sortedReviews.map((r) => (
              <div key={r._id || r.id} className={`p-6 rounded-2xl shadow ${panelBg} relative`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${theme === "dark" ? "bg-indigo-500 text-white" : "bg-indigo-100 text-indigo-700"}`}>
                    {(r.author || r.userId || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{r.author || "Anonymous"}</p>
                    <p className={`text-xs ${subtleText}`}>{new Date(r.createdAt || r.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-yellow-400 font-bold">⭐ {r.rating}/10</div>
                </div>

                <p className={`italic border-l-4 pl-4 ${theme === "dark" ? "border-indigo-400 text-gray-300" : "border-indigo-600 text-gray-700"}`}>
                  {r.comment}
                </p>

                {/* replies */}
                <div className="mt-4 space-y-3">
                  {(r.replies || []).map((rep, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-100 border-gray-200 text-black"}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{rep.author || "User"}</p>
                          <p className={`text-xs ${subtleText}`}>{new Date(rep.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="mt-2">{rep.comment}</p>
                    </div>
                  ))}

                  {openReplyFor === (r._id || r.id) ? (
                    <div className="flex gap-2 mt-2">
                      <input value={replyText} onChange={(e) => setReplyText(e.target.value)} className={`flex-1 p-2 rounded-md border ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`} placeholder="Write a reply..." />
                      <button onClick={() => submitReply(r._id || r.id)} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Reply</button>
                      <button onClick={() => { setOpenReplyFor(null); setReplyText(""); }} className="px-4 py-2 rounded-md bg-gray-300">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setOpenReplyFor(r._id || r.id)} className={`text-sm mt-2 ${theme === "dark" ? "text-indigo-300" : "text-indigo-600"}`}>Reply</button>
                  )}
                </div>

                {/* actions */}
                <div className="flex gap-4 mt-4 text-lg">
                  <button onClick={() => toggleLike(r._id || r.id)} className={`${theme === "dark" ? "text-green-400" : "text-green-600"} hover:scale-110 transition`}>👍 {(r.likes || []).length}</button>
                  <button onClick={() => toggleDislike(r._id || r.id)} className={`${theme === "dark" ? "text-red-400" : "text-red-600"} hover:scale-110 transition`}>👎 {(r.dislikes || []).length}</button>
                </div>

                {user && (user.id === r.userId || user._id === r.userId || user.email === r.author) && (
                  <div className="absolute top-4 right-4 flex gap-3 text-sm">
                    <button className={theme === "dark" ? "text-indigo-300" : "text-indigo-600"} onClick={() => startEdit(r)}>Edit</button>
                    <button className={theme === "dark" ? "text-red-400" : "text-red-600"} onClick={() => deleteReview(r._id || r.id)}>Delete</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      
        {/* RELATED MOVIES
        
         <div className={`p-6 rounded-2xl border shadow ${panelBg}`}>
          <h3 className="text-2xl font-bold mb-4 animated-pulse">Related Movies</h3>

          {related.length === 0 ? (
            <p className="text-gray-400 text-center">No related movies.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((m) => (
                <Link
                  key={m.id}
                  to={`/movie/${m.id}`}
                  className="group block rounded-2xl overflow-hidden shadow hover:-translate-y-1 hover:shadow-xl transition"
                >
                  <img
                    src={m.image}
                    alt={m.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition"
                  />
                  <div className="p-3">
                    <p className="font-bold">{m.title}</p>
                    <p className="text-sm opacity-70">
                      {m.genre.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div> */}
      </div> 
    </div>
  );
}
