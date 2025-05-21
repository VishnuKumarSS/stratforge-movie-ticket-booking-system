import React, { useState, useEffect, useCallback } from "react";
import { getAllMovies } from "@services/api";
import MovieList from "@components/MovieList";
import FilterPanel from "@components/FilterPanel";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [initialCall, setInitialCall] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [genres, setGenres] = useState([]);

  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    current: 1,
  });

  // Extract unique genres from movies
  useEffect(() => {
    if (movies && movies.length > 0) {
      const uniqueGenres = [
        ...new Set(movies.map((movie) => movie.genre).filter(Boolean)),
      ];
      setGenres(uniqueGenres);
    }
  }, [movies]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  // Fetch movies with filters
  useEffect(() => {
    console.log("filters", filters);

    // Skip API call if all filter fields are empty strings
    const isAllEmpty =
      filters.title === "" &&
      filters.genre === "" &&
      filters.release_date === "" &&
      filters.ordering === "";

    if (!isAllEmpty || !initialCall) {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const data = await getAllMovies(filters);

          // Check if response has pagination structure
          if (data.results) {
            setMovies(data.results);
            setPagination({
              count: data.count || 0,
              next: data.next,
              previous: data.previous,
              current: filters.page || 1,
            });
          } else {
            // No pagination structure, just set the movies
            setMovies(data);
          }

          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      if (Object.keys(filters).length !== 0) {
        console.log("TEST", filters);
        setInitialCall(false);
      }

      fetchMovies();
    }
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Movies</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with filters */}
        <div className="lg:col-span-1">
          <FilterPanel onFilterChange={handleFilterChange} genres={genres} />
        </div>

        {/* Main content with movie list */}
        <div className="lg:col-span-3">
          <MovieList movies={movies} loading={loading} error={error} />

          {/* Pagination */}
          {pagination.count > 0 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handlePageChange(pagination.current - 1)}
                  disabled={!pagination.previous}
                  className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md ${
                    !pagination.previous
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300">
                  Page {pagination.current} of{" "}
                  {Math.ceil(pagination.count / 12)}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.current + 1)}
                  disabled={!pagination.next}
                  className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md ${
                    !pagination.next
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
