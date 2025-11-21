// import React, { useEffect, useState, useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";



// export default function ReviewForm({
//   movieId,
//   onAdd,
//   onEdit,
//   editingReview,
//   cancelEdit,
// }) {
//   const { user } = useContext(AuthContext);
// const { theme } = useContext(ThemeContext);
// const [rating, setRating] = useState(0);


//   const [comment, setComment] = useState("");

//   useEffect(() => {
//     if (editingReview) {
//       setRating(editingReview.rating);
//       setComment(editingReview.comment);
//     } else {
//       setRating("");
//       setComment("");
//     }
//   }, [editingReview]);

//   if (!user) {
//     return (
//       <p className="mt-4 text-center text-gray-100 italic">
//         Login to write a review.
//       </p>
//     );
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const numeric = Number(rating);
//     if (numeric < 1 || numeric > 10) {
//       alert("Rating must be between 1 and 10.");
//       return;
//     }

//     if (editingReview) {
//       onEdit({
//         ...editingReview,
//         rating: numeric,
//         comment: comment.trim(),
//       });
//     } else {
//       onAdd({
//         id: Date.now().toString(),
//         movieId,
//         userId: user.email,
//         userName: user.name || user.username || "User",
//         rating: numeric,
//         comment: comment.trim(),
//         createdAt: new Date().toISOString(),
//         replies: [],
//       });
//     }

//     setRating("");
//     setComment("");
//   };

//   return (
//    <form
//   onSubmit={handleSubmit}
//   className={`${theme === "dark"
//     ? "bg-gray-800 text-white border-gray-900"
//     : "bg-white text-black border-gray-900"
//   } p-6 rounded-2xl shadow-xl border`}
// >

//       {/* HEADER */}
//       <div className="mb-6 text-center">
//         <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse relative">
//           {editingReview ? "Edit Your Review" : "Write a Review"}
//         </h2>
//         <p className="text-gray-900 mt-1">
//           Your opinion matters — rate from 1 to 10.
//         </p>
//       </div>

//       {/* STAR RATING SELECTOR */}
// <div className="mb-6">
//   <label className="block font-semibold mb-2 text-gray-900">
//     Rating (1–10)
//   </label>

//   <div className="flex gap-2 flex-wrap">
//     {Array.from({ length: 10 }).map((_, index) => {
//       const value = index + 1;
//       return (
//         <span
//           key={value}
//           onClick={() => setRating(value)}
//           onMouseEnter={() => setRating(value)}
//           className={`cursor-pointer text-3xl transition
//             ${
//               rating >= value
//                 ? "text-yellow-400 drop-shadow"
//                 : "text-gray-300"
//             }
//           `}
//         >
//           ★
//         </span>
//       );
//     })}
//   </div>

//   <p className="text-sm text-gray-900 mt-1">
//     Selected: <strong>{rating || "None"}</strong>/10
//   </p>
// </div>

//       {/* COMMENT */}
//       <div className="mb-6">
//         <label className="block font-semibold mb-2 text-gray-900">
//           Your Review
//         </label>

//         <textarea
//           rows="6"
//           placeholder="Share your thoughts about this movie..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           required
//           className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50
//                      focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
//         />
//       </div>

//       {/* BUTTONS */}
//       <div className="flex gap-4">
//         {/* SUBMIT */}
//         <button
//           type="submit"
//           className="w-full py-3 rounded-xl text-white font-semibold shadow-lg
//                      bg-linear-to-r from-indigo-600 to-purple-600
//                      hover:from-indigo-500 hover:to-purple-500
//                      active:scale-95 transition-all"
//         >
//           {editingReview ? "Update Review" : "Submit Review"}
//         </button>

//         {/* CANCEL */}
//         {editingReview && (
//           <button
//             type="button"
//             onClick={cancelEdit}
//             className="w-full py-3 rounded-xl text-gray-700 bg-gray-200 font-semibold shadow hover:bg-gray-300 active:scale-95 transition-all"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }
// import React, { useState, useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";

// export default function ReviewForm({ onSubmit }) {
//   const { user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   if (!user) {
//     return (
//       <p className="mt-4 text-center text-gray-500 italic">
//         Login to write a review.
//       </p>
//     );
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (rating < 1 || rating > 10) {
//       alert("Rating must be between 1 and 10.");
//       return;
//     }

//     if (!comment.trim()) {
//       alert("Comment cannot be empty.");
//       return;
//     }

//     onSubmit({
//       rating,
//       comment: comment.trim(),
//       author: user.email
//     });

//     setRating(5);
//     setComment("");
//   };

//   const starColor = (value) =>
//     rating >= value ? "text-yellow-400" : "text-gray-400";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className={`p-6 rounded-2xl shadow-xl border ${
//         theme === "dark"
//           ? "bg-gray-900 border-gray-700 text-white"
//           : "bg-white border-gray-300 text-black"
//       }`}
//     >
//       <h2 className="text-2xl font-bold mb-4">
//         Write a Review
//       </h2>

//       {/* STAR SELECTOR */}
//       <div className="mb-6">
//         <label className="block font-semibold mb-2">Rating (1–10)</label>

//         <div className="flex gap-1 flex-wrap">
//           {Array.from({ length: 10 }).map((_, i) => {
//             const value = i + 1;
//             return (
//               <span
//                 key={value}
//                 className={`text-3xl cursor-pointer transition ${starColor(
//                   value
//                 )}`}
//                 onClick={() => setRating(value)}
//               >
//                 ★
//               </span>
//             );
//           })}
//         </div>

//         <p className="text-sm mt-1">
//           Selected: <strong>{rating}</strong>/10
//         </p>
//       </div>

//       {/* COMMENT */}
//       <div className="mb-6">
//         <label className="block font-semibold mb-2">Your Review</label>
//         <textarea
//           rows="6"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="Share your thoughts about this movie..."
//           required
//           className={`w-full p-4 rounded-xl border resize-none ${
//             theme === "dark"
//               ? "bg-gray-800 border-gray-700 text-white"
//               : "bg-gray-50 border-gray-300 text-black"
//           }`}
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full py-3 rounded-xl text-white font-semibold shadow-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all"
//       >
//         Submit Review
//       </button>
//     </form>
//   );
// }
// // src/components/ReviewForm.jsx
// import React, { useState, useContext, useEffect } from "react";
// import AuthContext from "../context/AuthContext";
// import API from "../api/api";

// export default function ReviewForm({ movieId, editing, onSaved, onCancel }) {
//   const { user } = useContext(AuthContext);

//   const [rating, setRating] = useState(editing?.rating || 8);
//   const [comment, setComment] = useState(editing?.comment || "");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setRating(editing?.rating || 8);
//     setComment(editing?.comment || "");
//   }, [editing]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("Login required");
//     if (!comment.trim()) return alert("Comment required");
//     setLoading(true);

//     try {
//       if (editing) {
//         await API.put(`/api/reviews/${editing._id || editing.id}`, { rating, comment });
//       } else {
//         await API.post(`/api/reviews/${movieId}`, { rating, comment });
//       }
//       onSaved && onSaved();
//     } catch (err) {
//       console.error("Review submit failed", err);
//       alert(err?.response?.data?.message || "Failed to submit review");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl">
//       <div className="mb-3 text-gray-200 font-semibold">{editing ? "Edit Review" : "Write a Review"}</div>

//       <div className="flex items-center gap-3 mb-3">
//         <label className="text-sm text-gray-300">Rating</label>
//         <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="p-2 rounded bg-black border border-gray-700 text-white">
//           {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n}/10</option>)}
//         </select>
//       </div>

//       <textarea
//         rows={5}
//         placeholder="Share your thoughts..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white mb-4"
//       />

//       <div className="flex gap-3">
//         <button disabled={loading} type="submit" className="px-5 py-2 bg-red-600 text-white rounded-md">Save</button>
//         {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md">Cancel</button>}
//       </div>
//     </form>
//   );
// }
// src/components/ReviewForm.jsx
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import API from "../api/api";

export default function ReviewForm({ movieId, editing, onSaved, onCancel }) {
  const { user } = useContext(AuthContext);

  const [rating, setRating] = useState(editing?.rating || 8);
  const [comment, setComment] = useState(editing?.comment || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRating(editing?.rating || 0);
    setComment(editing?.comment || "");
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login required");
    if (!comment.trim()) return alert("Comment required");

    setLoading(true);

    try {
      if (editing) {
        await API.put(`/api/reviews/${editing._id || editing.id}`, {
          rating,
          comment,
        });
      } else {
        await API.post(`/api/reviews/${movieId}`, {
          rating,
          comment,
        });
      }
      onSaved && onSaved();
    } catch (err) {
      console.error("Review submit failed", err);
      alert(err?.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        backdrop-blur-xl bg-black/40  
        border border-gray-800 
        rounded-2xl p-8 
        shadow-2xl 
        transition-all duration-300 
        hover:border-red-400/40 hover:shadow-red-500/20
      "
    >
      <h2 className="text-2xl font-bold text-red-400 mb-5">
        {editing ? "Edit Your Review" : "Write a Review"}
      </h2>

      {/* Rating Selector */}
      <div className="mb-5">
        <label className="text-gray-300 font-semibold text-sm">Rating</label>
        <div className="mt-2 flex gap-2 flex-wrap">
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={`
                px-3 py-2 rounded-lg text-sm font-semibold 
                transition-all duration-200
                ${
                  rating === n
                    ? "bg-red-600 text-white shadow-lg scale-105"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }
              `}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div className="mb-6">
        <label className="text-gray-300 font-semibold text-sm">Your Review</label>
        <textarea
          rows={6}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts on this movie..."
          className="
            w-full mt-2 p-4 rounded-xl 
            bg-black/60 text-gray-200 
            border border-gray-700 
            focus:ring-2 focus:ring-red-500 focus:border-red-500
            transition-all duration-200
          "
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="
            px-6 py-2 rounded-xl 
            bg-red-600 text-white 
            font-semibold shadow-lg 
            transition-transform duration-200 
            hover:scale-105 active:scale-95
          "
        >
          {loading ? "Saving..." : "Save Review"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="
              px-6 py-2 rounded-xl 
              bg-gray-800 text-gray-300 
              shadow-md hover:bg-gray-700 
              transition-all duration-200
            "
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
