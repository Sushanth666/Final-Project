
import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, theme = "light" }) {
  // Dynamic class assignments based on theme
 // In MovieCard component, adjust these variables:
const cardBg = theme === "light" ? "bg-white" : "bg-black"; // pure black background in dark mode
const cardBorder = theme === "light" ? "border-gray-200" : "border-gray-700"; // visible border in dark mode
const cardText = theme === "light" ? "text-gray-900" : "text-white"; // white text in dark mode for readability
const titleText = theme === "light" ? "text-gray-900" : "text-white";
const genreTextClass = theme === "light" ? "text-gray-600" : "text-gray-400";


  const genreText =
    Array.isArray(movie.genre)
      ? movie.genre.join(", ")
      : movie.genre || "Unknown Genre";

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <article
        className={`rounded-xl overflow-hidden shadow-md border transform hover:scale-105 transition duration-300 ${cardBg} ${cardBorder} ${cardText}`}
      >
        {/* Poster */}
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-56 object-cover"
        />

        {/* Info */}
        <div className="p-4">
          <h3 className={`text-lg font-semibold truncate ${titleText}`}>
            {movie.title}
          </h3>

          <p className={`text-sm mt-1 italic ${genreTextClass}`}>
            {genreText}
          </p>

          <div className="mt-3 flex items-center justify-between">
            {/* Rating */}
            <span className="text-yellow-500 font-semibold text-sm">
              ⭐ {movie.avgRating || movie.rating || "N/A"}
            </span>

            {/* Details Button */}
            <span
              className="px-3 py-1 text-sm font-medium rounded-lg 
              text-white bg-linear-to-r from-indigo-500 to-purple-500 
              hover:opacity-90 transition"
            >
              Details
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
