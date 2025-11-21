import React, { useState, useEffect } from 'react';
import FilterSidebar from '../components/FilterSidebar'; // Adjust this path if needed

// --- DUMMY MOVIE DATA ---
// In a real app, you would fetch this from your API inside a useEffect
const allMovies = [
  { id: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi', language: 'English' },
  { id: 2, title: 'The Dark Knight', year: 2008, genre: 'Action', language: 'English' },
  { id: 3, title: 'Parasite', year: 2019, genre: 'Drama', language: 'Korean' },
  { id: 4, title: 'Amélie', year: 2001, genre: 'Comedy', language: 'French' },
  { id: 5, title: 'Avengers: Endgame', year: 2019, genre: 'Action', language: 'English' },
  { id: 6, title: 'Coco', year: 2017, genre: 'Comedy', language: 'Spanish' },
  { id: 7, title: 'Oldboy', year: 2003, genre: 'Thriller', language: 'Korean' },
  { id: 8, title: 'Interstellar', year: 2014, genre: 'Sci-Fi', language: 'English' },
  { id: 9, title: 'Life Is Beautiful', year: 1997, genre: 'Comedy', language: 'Italian' },
  { id: 10, title: '3 Idiots', year: 2009, genre: 'Comedy', language: 'Hindi' },
];

export default function HomePage() {
  // State for the filter values
  const [filters, setFilters] = useState({
    year: '',
    genre: '',
    language: ''
  });

  // State for the master list of movies (from API)
  const [movies, setMovies] = useState([]); 
  // State for the movies being displayed
  const [filteredMovies, setFilteredMovies] = useState([]);

  // 1. Load initial movie data
  useEffect(() => {
    // Simulating an API call
    setMovies(allMovies);
    setFilteredMovies(allMovies);
  }, []); // Empty array = runs once on component mount

  // 2. Function to update filters state, passed to Sidebar
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  // 3. Apply filters whenever the 'filters' state or 'movies' list changes
  useEffect(() => {
    let tempFilteredMovies = [...movies];

    // Apply year filter
    if (filters.year) {
      tempFilteredMovies = tempFilteredMovies.filter(
        movie => movie.year.toString() === filters.year
      );
    }

    // Apply genre filter
    if (filters.genre) {
      tempFilteredMovies = tempFilteredMovies.filter(
        movie => movie.genre === filters.genre
      );
    }

    // Apply language filter
    if (filters.language) {
      tempFilteredMovies = tempFilteredMovies.filter(
        movie => movie.language === filters.language
      );
    }

    setFilteredMovies(tempFilteredMovies);
  }, [filters, movies]); // Re-run this logic anytime filters or movies change

  return (
    // This div provides the main padding for the page content
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* --- COLUMN 1: FILTER SIDEBAR (The left side) --- */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <FilterSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
        </div>

        {/* --- COLUMN 2: MOVIE LIST (The main section) --- */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Movies
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                <div 
                  key={movie.id} 
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {movie.year} | {movie.genre} | {movie.language}
                  </p>
                  {/* Add more movie details or a <Link> here */}
                </div>
              ))
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                No movies match your filters.
              </p>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}