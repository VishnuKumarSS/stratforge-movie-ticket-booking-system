import React, { useState, useEffect } from "react";
import { getUpcomingShowtimes } from "@/services/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";

export default function UpcomingShows() {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  useEffect(() => {
    const fetchUpcomingShowtimes = async () => {
      setLoading(true);
      try {
        const data = await getUpcomingShowtimes({ date: selectedDate });
        setShowtimes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch upcoming showtimes");
        setLoading(false);
      }
    };

    fetchUpcomingShowtimes();
  }, [selectedDate]);

  // Generate dates for the next 14 days
  const getDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i);
      dates.push({
        date: format(date, "yyyy-MM-dd"),
        display: format(date, "EEE, MMM d"),
      });
    }

    return dates;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="flex items-center justify-center h-96">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Upcoming Shows</h1>

        {/* Date Selection */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-500 mb-3">
            Select Date
          </h3>
          <div className="flex overflow-x-auto gap-2 pb-2">
            {getDates().map((date) => (
              <Button
                key={date.date}
                variant={selectedDate === date.date ? "default" : "outline"}
                onClick={() => setSelectedDate(date.date)}
                className="whitespace-nowrap"
              >
                {date.display}
              </Button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {showtimes.length === 0 && !loading && !error ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-slate-200">
            <h2 className="text-xl font-semibold mb-4">No Shows Available</h2>
            <p className="text-slate-600 mb-6">
              There are no shows scheduled for{" "}
              {format(new Date(selectedDate), "MMMM d, yyyy")}.
            </p>
            <Button variant="outline" asChild>
              <Link to="/movies">Browse Movies</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showtimes.map((showtime) => (
              <div
                key={showtime.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 flex flex-col h-full"
              >
                {/* Movie Poster */}
                <div className="relative h-48 overflow-hidden">
                  {showtime.movie.poster_url ? (
                    <div className="relative h-full">
                      <img
                        src={`http://localhost:8000${showtime.movie.poster_url}`}
                        alt={showtime.movie.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="bg-slate-200 h-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
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

                <div className="p-6 flex-grow">
                  <div className="flex flex-col mb-4">
                    <h2 className="text-xl font-bold mb-1">
                      {showtime.movie.title}
                    </h2>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {showtime.movie.genre}
                      </span>
                      <span className="text-slate-500 text-sm">
                        {showtime.movie.duration} min
                      </span>
                    </div>
                    {showtime.movie.short_description && (
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                        {showtime.movie.short_description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
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
                        className="text-slate-400 mt-1"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                      <span>
                        {format(new Date(showtime.date), "EEEE, MMMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
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
                        className="text-slate-400 mt-1"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>
                        {format(
                          new Date(`${showtime.date}T${showtime.time}`),
                          "h:mm a"
                        )}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
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
                        className="text-slate-400 mt-1"
                      >
                        <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                        <path d="m22 6-10 7L2 6"></path>
                      </svg>
                      <span>{showtime.screen}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex gap-4">
                    <Button asChild className="w-full">
                      <Link to={`/seat-selection/${showtime.id}`}>
                        Book Tickets
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/movies/${showtime.movie.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
