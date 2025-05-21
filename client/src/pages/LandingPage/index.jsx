import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "@services/api";
import MovieList from "@components/MovieList";
import { Button } from "@components/ui/button";
export default function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured movies (no filters)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        // Only show the first 6 movies on landing page
        const featuredMovies = data.results
          ? data.results.slice(0, 6)
          : data.slice(0, 6);
        setMovies(featuredMovies);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Featured Movies</h1>
        <Button variant="outline">
          <Link to="/movies">View All Movies</Link>
        </Button>
      </div>

      <MovieList movies={movies} loading={loading} error={error} />
    </div>
  );
}
