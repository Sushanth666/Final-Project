// import React, { useState, useContext, useEffect } from "react";
// import API from "../api/api"; 
// import MovieCard from "../components/MovieCard";
// import FilterSidebar from "../components/FilterSidebar";
// import ThemeContext from "../context/ThemeContext";
// import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

// const SearchIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
//   </svg>
// );

// export default function Home() {
//   const { theme } = useContext(ThemeContext);

//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({
//     year: "",
//     genre: "",
//     language: "",
//     rating: "",
//     actor: "",
//   });
//   const [sortOrder, setSortOrder] = useState("");
//   const [popularGenre, setPopularGenre] = useState("Action");

//   // -----------------------------
//   // 🔥 FETCH MOVIES FROM BACKEND
//   // -----------------------------
//   useEffect(() => {
//     API.get("/api/movies")
//       .then((res) => {
//         setMovies(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch movies", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-2xl">
//         Loading movies...
//       </div>
//     );
//   }

//   // -----------------------------
//   // Filtering logic
//   // -----------------------------
//   const handleFilterChange = (filterName, value) => {
//     setFilters((prev) => ({ ...prev, [filterName]: value }));
//   };

//   const filtered = movies.filter((m) => {
//     const mainSearchMatches = m.title.toLowerCase().includes(search.toLowerCase());
//     const yearMatches = !filters.year || m.year?.toString() === filters.year;
//     const ratingMatches = !filters.rating || (m.rating && m.rating >= parseFloat(filters.rating));

//     const genreMatches =
//       !filters.genre ||
//       (Array.isArray(m.genre)
//         ? m.genre.some((g) => g.toLowerCase() === filters.genre.toLowerCase())
//         : m.genre?.toLowerCase() === filters.genre.toLowerCase());

//     return mainSearchMatches && yearMatches && ratingMatches && genreMatches;
//   });

//   let sortedAndFilteredMovies = [...filtered];
//   if (sortOrder === "title-asc") sortedAndFilteredMovies.sort((a, b) => a.title.localeCompare(b.title));
//   else if (sortOrder === "title-desc") sortedAndFilteredMovies.sort((a, b) => b.title.localeCompare(a.title));
//   else if (sortOrder === "year-desc") sortedAndFilteredMovies.sort((a, b) => b.year - a.year);
//   else if (sortOrder === "year-asc") sortedAndFilteredMovies.sort((a, b) => a.year - b.year);

//   const checkGenre = (movie, genreToFind) => {
//     if (!movie.genre) return false;
//     const g = genreToFind.toLowerCase();
//     if (typeof movie.genre === "string") return movie.genre.toLowerCase() === g;
//     if (Array.isArray(movie.genre)) return movie.genre.some((gg) => gg.toLowerCase() === g);
//     return false;
//   };

//   const trendingNow = sortedAndFilteredMovies.filter((m) => m.year > 2015).slice(0, 10);
//   const popularMovies = sortedAndFilteredMovies.filter((m) => checkGenre(m, popularGenre)).slice(0, 8);

//   const bgClass = theme === "light" ? "bg-white" : "bg-black";
//   const textClass = theme === "light" ? "text-black" : "text-white";
//   const inputBg = theme === "light" ? "bg-white" : "bg-zinc-900";
//   const inputText = theme === "light" ? "text-black" : "text-white";
//   const inputBorder = theme === "light" ? "border-gray-300" : "border-gray-600";

//   return (
//     <div className={`min-h-screen flex flex-col transition-colors duration-300 ${bgClass} ${textClass}`}>
//       <div className="flex-1 max-w-7xl w-full mx-auto p-6">

//         {/* --------------------------- */}
//         {/* HERO + SEARCH + SORT */}
//         {/* --------------------------- */}
//         <section className={`mb-12 ${theme === "light" ? "bg-gray-100" : "bg-zinc-950/80"} backdrop-blur-sm rounded-xl p-8 shadow-lg`}>
//           <h1 className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-red-500">
//             Explore Movies 🎥
//           </h1>

//           <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
//             {/* SEARCH */}
//             <div className="relative w-full sm:flex-1 max-w-xl">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//                 <SearchIcon />
//               </span>
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search movies..."
//                 className={`w-full p-4 pl-12 rounded-xl border shadow-lg ${inputBg} ${inputText} ${inputBorder}`}
//               />
//             </div>

//             {/* SORT */}
//             <div className="relative w-full sm:w-48">
//               <select
//                 value={sortOrder}
//                 onChange={(e) => setSortOrder(e.target.value)}
//                 className={`w-full p-4 pl-12 rounded-xl border shadow-lg ${inputBg} ${inputText} ${inputBorder}`}
//               >
//                 <option value="">Default Order</option>
//                 <option value="title-asc">Title (A-Z)</option>
//                 <option value="title-desc">Title (Z-A)</option>
//                 <option value="year-desc">Year (Newest)</option>
//                 <option value="year-asc">Year (Oldest)</option>
//               </select>
//               <ChevronUpDownIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" />
//             </div>
//           </div>
//         </section>
// {/* POPULAR ROW */}

// {popularMovies.length > 0 && (
//   <section className="mb-12">
//     <h2 className="text-3xl font-bold mb-4">
//       Popular Movies in {popularGenre}
//     </h2>

//     <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
//       {popularMovies.map((movie) => (
//         <div key={movie._id} className="min-w-[200px]">
//           <MovieCard movie={movie} theme={theme} />
//         </div>
//       ))}
//     </div>
//   </section>
// )}


//         {/* --------------------------- */}
//         {/* MAIN CONTENT */}
//         {/* --------------------------- */}
//         <div className="flex flex-col md:flex-row gap-6 mb-12">

//           {/* SIDEBAR */}
//           <div className="w-full md:w-1/4 lg:w-1/5">
//             <FilterSidebar filters={filters} onFilterChange={handleFilterChange} theme={theme} />
//           </div>

//           {/* MOVIES LIST */}
//           <main className="w-full md:w-3/4 lg:w-4/5">
//             <h2 className="text-3xl font-bold mb-6">
//               All Movies
//             </h2>

//             <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//               {sortedAndFilteredMovies.length > 0 ? (
//                 sortedAndFilteredMovies.map((movie) => (
//                   <MovieCard key={movie._id} movie={movie} theme={theme} />
//                 ))
//               ) : (
//                 <div className="text-center col-span-full py-20 text-gray-400">
//                   No Movies Found
//                 </div>
//               )}
//             </div>
//           </main>
//         </div>

//       </div>
//     </div>
//   );
// }
import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import API from "../api/api";
import MovieCard from "../components/MovieCard";
import FilterSidebar from "../components/FilterSidebar";
import ThemeContext from "../context/ThemeContext";
import { ChevronUpDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const POPULAR_GENRES = ["Action", "Thriller", "Sci-Fi", "Drama", "Adventure", "Horror"];

export default function Home() {
  const { theme } = useContext(ThemeContext);

  // -----------------------------
  // STATE
  // -----------------------------
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Synced search + filters (Option B)
  const [filters, setFilters] = useState({
    movieTitle: "",
    year: "",
    genre: "",
    language: "",
    rating: "",
  });

  const [sortOrder, setSortOrder] = useState("");

  const popularRefs = useRef({}); // refs for each genre row

  // -----------------------------
  // FETCH MOVIES
  // -----------------------------
  useEffect(() => {
    API.get("/api/movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // -----------------------------
  // FILTER HANDLER
  // -----------------------------
  const handleFilterChange = (key, value) => {
    if (key === "reset") {
      setFilters({
        movieTitle: "",
        year: "",
        genre: "",
        language: "",
        rating: "",
      });
      return;
    }

    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // -----------------------------
  // FILTERING LOGIC
  // -----------------------------
  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      const titleMatch =
        !filters.movieTitle ||
        m.title.toLowerCase().includes(filters.movieTitle.toLowerCase());

      const yearMatch = !filters.year || m.year?.toString() === filters.year;

      const ratingMatch =
        !filters.rating || m.rating >= Number(filters.rating);

      const genreMatch =
        !filters.genre ||
        (Array.isArray(m.genre)
          ? m.genre.some((g) => g.toLowerCase() === filters.genre.toLowerCase())
          : m.genre?.toLowerCase() === filters.genre.toLowerCase());

      const languageMatch =
        !filters.language ||
        m.language?.toLowerCase() === filters.language.toLowerCase();

      return (
        titleMatch &&
        yearMatch &&
        ratingMatch &&
        genreMatch &&
        languageMatch
      );
    });
  }, [movies, filters]);

  // -----------------------------
  // SORTING
  // -----------------------------
  const finalMovies = useMemo(() => {
    const arr = [...filteredMovies];

    if (sortOrder === "title-asc") arr.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOrder === "title-desc") arr.sort((a, b) => b.title.localeCompare(a.title));
    if (sortOrder === "year-asc") arr.sort((a, b) => a.year - b.year);
    if (sortOrder === "year-desc") arr.sort((a, b) => b.year - a.year);

    return arr;
  }, [filteredMovies, sortOrder]);

  // -----------------------------
  // GENRE SCROLLER
  // -----------------------------
  const scrollLeft = (genre) => {
    popularRefs.current[genre]?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (genre) => {
    popularRefs.current[genre]?.scrollBy({ left: 300, behavior: "smooth" });
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-black" : "bg-white";
  const textClass = isDark ? "text-white" : "text-black";
  const inputBg = isDark ? "bg-zinc-900" : "bg-white";
  const inputText = isDark ? "text-white" : "text-black";
  const inputBorder = isDark ? "border-gray-700" : "border-gray-300";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl">
        Loading movies...
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors`}>
      <div className="max-w-7xl mx-auto p-6">

        {/* -------------------------------- */}
        {/* HERO + SEARCH + SORT BLOCK */}
        {/* -------------------------------- */}
        <section
          className={`mb-12 rounded-xl p-8 shadow-lg ${
            isDark ? "bg-zinc-950/80" : "bg-gray-100"
          }`}
        >
          <h1 className="text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-500 to-red-500">
            Explore Movies 🎥
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            {/* SEARCH (Synced with Sidebar) */}
            <div className="relative w-full sm:w-2/3">
              <input
                value={filters.movieTitle}
                onChange={(e) => handleFilterChange("movieTitle", e.target.value)}
                placeholder="Search movies..."
                className={`w-full p-4 pl-4 rounded-xl border shadow-lg ${inputBg} ${inputText} ${inputBorder}`}
              />
            </div>

            {/* SORT */}
           {/* SORT */}
<div className="relative w-full sm:w-56">
  <div
    className={`
      absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none
      ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
    `}
  >
    <ChevronUpDownIcon className="w-5 h-5" />
  </div>

  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className={`
      w-full appearance-none pl-10 pr-4 py-3 rounded-xl font-medium
      transition-all duration-200 shadow-md border
      ${theme === "dark"
        ? "bg-gray-900 text-white border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600"
        : "bg-white text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
      }
      hover:shadow-lg
    `}
  >
    <option value="">Default Order</option>
    <option value="title-asc">Title (A–Z)</option>
    <option value="title-desc">Title (Z–A)</option>
    <option value="year-desc">Year (Newest)</option>
    <option value="year-asc">Year (Oldest)</option>
  </select>
</div>
</div>
        </section>

        {/* -------------------------------- */}
        {/* POPULAR ROWS */}
        {/* -------------------------------- */}
        {POPULAR_GENRES.map((genre) => {
          const items = finalMovies.filter((m) =>
            Array.isArray(m.genre)
              ? m.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
              : m.genre?.toLowerCase() === genre.toLowerCase()
          );

          if (!items.length) return null;

          return (
            <div key={genre} className="mb-12 relative">

              <h2 className="text-3xl font-bold mb-4">{genre} Movies</h2>

              {/* Arrows */}
              <button
                onClick={() => scrollLeft(genre)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full"
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() => scrollRight(genre)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full"
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>

              {/* Scrolling Row */}
              <div
                ref={(el) => (popularRefs.current[genre] = el)}
                className="overflow-x-auto flex gap-6 pb-4 scroll-smooth no-scrollbar"
              >
                {items.map((movie) => (
                  <div key={movie._id} className="min-w-[220px]">
                    <MovieCard movie={movie} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* -------------------------------- */}
        {/* CONTENT GRID */}
        {/* -------------------------------- */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">

          {/* FILTER SIDEBAR */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              theme={theme}
            />
          </div>

          {/* MOVIES GRID */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            <h2 className="text-3xl font-bold mb-6">All Movies</h2>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {finalMovies.length > 0 ? (
                finalMovies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} theme={theme} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-400">
                  No Movies Found
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

