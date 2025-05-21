import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "@/services/api";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="flex items-center justify-center h-96">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">
            Error loading movie details
          </h1>
          <p className="text-red-500 mb-6">{error}</p>
          <Button variant="default" asChild>
            <Link to="/">Back to movies</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">
            Movie not found
          </h1>
          <Button variant="default" asChild>
            <Link to="/">Back to movies</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    // <div className="">
    <div className="container mx-auto px-4">
      <Button variant="outline" asChild className="mb-8">
        <Link to="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to movies
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
      >
        <div className="md:flex">
          {/* Movie Poster */}
          <div className="md:w-2/5 lg:w-1/3 relative">
            {movie.poster_url ? (
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  src={`http://localhost:8000${movie.poster_url}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-96 md:h-full flex items-center justify-center bg-slate-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
            )}
          </div>

          {/* Movie Details */}
          <div className="md:w-3/5 lg:w-2/3 p-8 lg:p-10">
            <div className="flex flex-col h-full">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {movie.genre}
                  </span>
                  <span className="text-slate-500 text-sm">
                    {movie.duration} min
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-slate-800">
                  {movie.title}
                </h1>

                {movie.short_description && (
                  <p className="text-lg text-slate-600 mb-6 italic">
                    "{movie.short_description}"
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">
                      Release Date
                    </h3>
                    <p className="text-slate-800">
                      {new Date(movie.release_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">
                      Language
                    </h3>
                    <p className="text-slate-800">{movie.language}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">
                      Country
                    </h3>
                    <p className="text-slate-800">{movie.country}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">
                      Director
                    </h3>
                    <p className="text-slate-800">{movie.director}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-500 mb-2">
                    Cast
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.split(", ").map((actor, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-500 mb-2">
                    Writers
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.writers.split(", ").map((writer, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        {writer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-xl font-semibold mb-4 text-slate-800">
                  Synopsis
                </h3>
                <p className="text-slate-600 whitespace-pre-line mb-8 leading-relaxed">
                  {movie.description}
                </p>

                <Button variant="brutal" size="lg" className="w-full md:w-auto">
                  Book Tickets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    // </div>
  );
}
