// import React from 'react';
// import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// const genres = ["Thriller", "Sci-Fi", "Action", "Adventure", "Horror", "Drama"];
// const languages = ["English", "Tamil", "Hindi", "Kannada", "Malayalam"];

// const defaultFilters = {
//   movieTitle: '',
//   year: '',
//   rating: '',
//   genre: '',
//   language: ''
// };

// export default function FilterSidebar({
//   filters = defaultFilters,
//   onFilterChange = () => {},
//   theme = "light" // Accept theme prop
// }) {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onFilterChange(name, value);
//   };

//   // Dynamic classes for theme support
//   const sidebarBg = theme === "light" ? "bg-white/90" : "bg-zinc-900/80";
//   const sidebarText = theme === "light" ? "text-black" : "text-white";
//   const borderClass = theme === "light" ? "border-gray-200" : "border-gray-700";

//   const labelClass = theme === "light" ? "text-gray-700" : "text-gray-300";

//   const inputBg = theme === "light" ? "bg-gray-100" : "bg-zinc-800";
//   const inputText = theme === "light" ? "text-black" : "text-white";
//   const inputBorder = theme === "light" ? "border-gray-300" : "border-gray-600";
//   const placeholderClass = theme === "light" ? "placeholder-gray-500" : "placeholder-gray-400";

//   return (
//     <aside
//       className={`w-full md:w-64 p-4 rounded-xl shadow-lg h-fit border transition-colors duration-300
//         ${sidebarBg} ${sidebarText} ${borderClass} backdrop-blur-md`}
//     >
//       <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//         Filters
//       </h3>

//       <form className="space-y-4">
//         {/* Movie Title Search */}
//         <div>
//           <label htmlFor="movieTitle" className={`block text-sm font-medium ${labelClass}`}>
//             Search Movies
//           </label>
//           <div className="relative mt-1">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//               <MagnifyingGlassIcon className="w-5 h-5" />
//             </span>
//             <input
//               type="text"
//               name="movieTitle"
//               id="movieTitle"
//               value={filters.movieTitle}
//               onChange={handleChange}
//               placeholder="Search in filters..."
//               className={`block w-full p-2 pl-10 rounded-lg border 
//                 ${inputBg} ${inputText} ${inputBorder} ${placeholderClass}
//                 focus:outline-none focus:ring-2 focus:ring-purple-400 
//                 transition-all duration-300 hover:border-gray-400`}
//             />
//           </div>
//         </div>

//         <hr className={`my-4 ${borderClass}`} />

//         {/* Year Filter */}
//         <div>
//           <label htmlFor="year" className={`block text-sm font-medium ${labelClass}`}>
//             Year
//           </label>
//           <input
//             type="number"
//             name="year"
//             id="year"
//             value={filters.year}
//             onChange={handleChange}
//             placeholder="e.g., 2023"
//             className={`mt-1 block w-full p-2 rounded-lg border 
//               ${inputBg} ${inputText} ${inputBorder} ${placeholderClass}
//               focus:outline-none focus:ring-2 focus:ring-purple-400
//               transition-all duration-300 hover:border-gray-400`}
//           />
//         </div>

//         {/* Rating Filter */}
//         <div>
//           <label htmlFor="rating" className={`block text-sm font-medium ${labelClass}`}>
//             Rating
//           </label>
//           <div className="relative mt-1">
//             <select
//               name="rating"
//               id="rating"
//               value={filters.rating}
//               onChange={handleChange}
//               className={`mt-1 block w-full p-2 pr-10 rounded-lg border 
//                 ${inputBg} ${inputText} ${inputBorder}
//                 focus:outline-none focus:ring-2 focus:ring-purple-400 
//                 transition-all duration-300 appearance-none hover:border-gray-400`}
//             >
//               <option value="" className="bg-gray-800">All Ratings</option>
//               <option value="9" className="bg-gray-800">9+ Stars</option>
//               <option value="8" className="bg-gray-800">8+ Stars</option>
//               <option value="7" className="bg-gray-800">7+ Stars</option>
//               <option value="6" className="bg-gray-800">6+ Stars</option>
//             </select>
//             <span className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === "light" ? "text-gray-500" : "text-gray-400"} pointer-events-none`}>
//               <ChevronDownIcon className="w-5 h-5" />
//             </span>
//           </div>
//         </div>

//         {/* Genre Filter */}
//         <div>
//           <label htmlFor="genre" className={`block text-sm font-medium ${labelClass}`}>
//             Genre
//           </label>
//           <div className="relative mt-1">
//             <select
//               name="genre"
//               id="genre"
//               value={filters.genre}
//               onChange={handleChange}
//               className={`block w-full p-2 pr-10 rounded-lg border 
//                 ${inputBg} ${inputText} ${inputBorder}
//                 focus:outline-none focus:ring-2 focus:ring-purple-400
//                 transition-all duration-300 appearance-none 
//                 hover:border-gray-400`}
//             >
//               <option value="" className="bg-gray-800">All Genres</option>
//               {genres.map((genre) => (
//                 <option key={genre} value={genre} className="bg-gray-800">
//                   {genre}
//                 </option>
//               ))}
//             </select>
//             <span className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === "light" ? "text-gray-500" : "text-gray-400"} pointer-events-none`}>
//               <ChevronDownIcon className="w-5 h-5" />
//             </span>
//           </div>
//         </div>

//         {/* Language Filter */}
//         <div>
//           <label htmlFor="language" className={`block text-sm font-medium ${labelClass}`}>
//             Language
//           </label>
//           <div className="relative mt-1">
//             <select
//               name="language"
//               id="language"
//               value={filters.language}
//               onChange={handleChange}
//               className={`block w-full p-2 pr-10 rounded-lg border 
//                 ${inputBg} ${inputText} ${inputBorder}
//                 focus:outline-none focus:ring-2 focus:ring-purple-400
//                 transition-all duration-300 appearance-none 
//                 hover:border-gray-400`}
//             >
//               <option value="" className="bg-gray-800">All Languages</option>
//               {languages.map((lang) => (
//                 <option key={lang} value={lang} className="bg-gray-800">
//                   {lang}
//                 </option>
//               ))}
//             </select>
//             <span className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === "light" ? "text-gray-500" : "text-gray-400"} pointer-events-none`}>
//               <ChevronDownIcon className="w-5 h-5" />
//             </span>
//           </div>
//         </div>

//         {/* Reset Filters Button */}
//         <button
//           type="button"
//           onClick={() =>
//             ["movieTitle", "year", "rating", "genre", "language"].forEach((key) =>
//               onFilterChange(key, "")
//             )
//           }
//           className="w-full mt-4 py-2 rounded-lg font-semibold text-white bg-linear-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
//         >
//           Reset Filters
//         </button>
//       </form>
//     </aside>
//   );
// }
import React from "react";
import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const GENRES = ["Thriller", "Sci-Fi", "Action", "Adventure", "Horror", "Drama"];
const LANGUAGES = ["English", "Tamil", "Hindi", "Kannada", "Malayalam"];

export default function FilterSidebar({ filters, onFilterChange, theme }) {
  
  const isDark = theme === "dark";

  // Theme classes
  const bg = isDark ? "bg-zinc-900/80" : "bg-white/90";
  const text = isDark ? "text-white" : "text-black";
  const border = isDark ? "border-gray-700" : "border-gray-200";
  const label = isDark ? "text-gray-300" : "text-gray-700";

  const inputBg = isDark ? "bg-zinc-800" : "bg-gray-100";
  const inputText = isDark ? "text-white" : "text-black";
  const inputBorder = isDark ? "border-gray-600" : "border-gray-300";
  const placeholder = isDark ? "placeholder-gray-400" : "placeholder-gray-500";

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const resetFilters = () => {
    onFilterChange("reset", true); // parent resets all
  };

  return (
    <aside
      className={`w-full md:w-64 p-4 rounded-xl shadow-lg h-fit border ${bg} ${text} ${border} backdrop-blur-md`}
    >
      <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Filters
      </h3>

      <form className="space-y-4">

        {/* Search */}
        <div>
          <label className={`block text-sm font-medium ${label}`}>Search Movies</label>
          <div className="relative mt-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              name="movieTitle"
              value={filters.movieTitle}
              onChange={handleChange}
              placeholder="Search in filters..."
              className={`w-full p-2 pl-10 rounded-lg border ${inputBg} ${inputText} ${inputBorder} ${placeholder}
                focus:ring-2 focus:ring-purple-400 outline-none`}
            />
          </div>
        </div>

        <hr className={`${border}`} />

        {/* Year */}
        <div>
          <label className={`block text-sm font-medium ${label}`}>Year</label>
          <input
            type="number"
            name="year"
            value={filters.year}
            onChange={handleChange}
            placeholder="e.g., 2023"
            className={`w-full p-2 rounded-lg border ${inputBg} ${inputText} ${inputBorder} ${placeholder}
              focus:ring-2 focus:ring-purple-400 outline-none`}
          />
        </div>

        {/* Rating */}
        <div>
          <label className={`block text-sm font-medium ${label}`}>Rating</label>
          <div className="relative mt-1">
            <select
              name="rating"
              value={filters.rating}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg border ${inputBg} ${inputText} ${inputBorder}
                appearance-none focus:ring-2 focus:ring-purple-400 outline-none`}
            >
              <option value="">All Ratings</option>
              <option value="9">9+ Stars</option>
              <option value="8">8+ Stars</option>
              <option value="7">7+ Stars</option>
              <option value="6">6+ Stars</option>
            </select>

            <ChevronDownIcon
              className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              } pointer-events-none`}
            />
          </div>
        </div>

        {/* Genre */}
        <div>
          <label className={`block text-sm font-medium ${label}`}>Genre</label>
          <div className="relative mt-1">
            <select
              name="genre"
              value={filters.genre}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg border ${inputBg} ${inputText} ${inputBorder}
                appearance-none focus:ring-2 focus:ring-purple-400 outline-none`}
            >
              <option value="">All Genres</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <ChevronDownIcon
              className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              } pointer-events-none`}
            />
          </div>
        </div>

        {/* Language */}
        <div>
          <label className={`block text-sm font-medium ${label}`}>Language</label>
          <div className="relative mt-1">
            <select
              name="language"
              value={filters.language}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg border ${inputBg} ${inputText} ${inputBorder}
                appearance-none focus:ring-2 focus:ring-purple-400 outline-none`}
            >
              <option value="">All Languages</option>
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            <ChevronDownIcon
              className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              } pointer-events-none`}
            />
          </div>
        </div>

        {/* Reset */}
        <button
          type="button"
          onClick={resetFilters}
          className="w-full py-2 rounded-lg font-semibold text-white bg-linear-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          Reset Filters
        </button>
      </form>
    </aside>
  );
}
