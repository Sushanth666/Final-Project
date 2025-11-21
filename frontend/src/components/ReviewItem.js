import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function ReviewItem({ review, onEdit, onDelete }) {
  const { user } = useContext(AuthContext);
  
  // Check if the currently logged-in user is the author of this review
  const isAuthor = user && user.email === review.userId;

  return (
    <article className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg relative">
      <div className="flex items-center mb-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-700 mr-3 flex items-center justify-center">
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-200">
            {review.userName?.[0]?.toUpperCase() || "U"}
          </span>
        </div>
        {/* User and Date */}
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {review.userName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
        {/* Rating */}
        <div className="ml-auto text-yellow-400 text-lg font-bold bg-yellow-100/50 dark:bg-yellow-800/50 px-3 py-1 rounded-full border">
          ⭐ {review.rating}
        </div>
      </div>

      {/* Comment */}
      <p className="text-gray-700 dark:text-gray-300 italic border-l-4 border-indigo-200 dark:border-indigo-400 pl-4">
        "{review.comment}"
      </p>

      {/* Edit/Delete Buttons */}
      {isAuthor && (
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => onEdit(review)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(review.id)}
            className="text-xs font-semibold text-red-600 dark:text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}