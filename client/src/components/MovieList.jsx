import React from "react";
import { Link } from "react-router-dom";

export default function MovieList({ movies, loading, error }) {
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">Error loading movies</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies &&
        movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className="bg-white rounded-lg shadow-myshadow_sm border border-black overflow-hidden hover:shadow-myshadow_lg transition-shadow duration-300"
          >
            <div className="h-64 bg-gray-200 overflow-hidden">
              {movie.poster_url ? (
                <img
                  src={`http://localhost:8000${movie.poster_url}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <span className="text-gray-500">No poster available</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              {movie.genre && (
                <div className="mb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {movie.genre}
                  </span>
                  {movie.duration && (
                    <span className="inline-block text-sm text-gray-600">
                      {movie.duration} min
                    </span>
                  )}
                </div>
              )}
              <p className="text-gray-600 line-clamp-2">
                {movie.short_description || movie.description}
              </p>
            </div>
          </Link>
        ))}

      {movies && movies.length === 0 && (
        <p className="text-center text-gray-500 mt-8 col-span-3">
          No movies available at this time.
        </p>
      )}
    </div>
  );
}
