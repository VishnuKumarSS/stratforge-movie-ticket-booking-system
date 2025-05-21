import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "@/services/api";

export default function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch movie details");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Loading movie details...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Error loading movie details</h1>
        <p className="text-red-500">{error}</p>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          Back to movies
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Movie not found</h1>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          Back to movies
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Back to movies
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-96 md:h-full object-cover"
              />
            ) : (
              <div className="w-full h-96 md:h-full flex items-center justify-center bg-gray-300">
                <span className="text-gray-500">No poster available</span>
              </div>
            )}
          </div>

          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

            <div className="mb-6">
              <p className="text-gray-700 whitespace-pre-line">
                {movie.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {movie.genre && (
                <div>
                  <h3 className="text-lg font-semibold">Genre</h3>
                  <p>{movie.genre}</p>
                </div>
              )}

              {movie.duration && (
                <div>
                  <h3 className="text-lg font-semibold">Duration</h3>
                  <p>{movie.duration} minutes</p>
                </div>
              )}

              {movie.release_date && (
                <div>
                  <h3 className="text-lg font-semibold">Release Date</h3>
                  <p>{new Date(movie.release_date).toLocaleDateString()}</p>
                </div>
              )}

              {movie.rating && (
                <div>
                  <h3 className="text-lg font-semibold">Rating</h3>
                  <p>{movie.rating}</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
