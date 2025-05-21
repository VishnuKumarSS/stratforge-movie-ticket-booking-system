import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getShowtimeDetails } from "@/services/api";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function SeatSelection() {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [showtime, setShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowtimeDetails = async () => {
      try {
        const data = await getShowtimeDetails(showtimeId);
        setShowtime(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch showtime details");
        setLoading(false);
      }
    };

    fetchShowtimeDetails();
  }, [showtimeId]);

  const handleSeatClick = (seatId) => {
    if (showtime.booked_seats.includes(seatId)) return; // Can't select booked seats

    const isSelected = selectedSeats.includes(seatId);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatStatus = (seatId) => {
    if (showtime.booked_seats.includes(seatId)) {
      return "booked";
    }

    if (selectedSeats.includes(seatId)) {
      return "selected";
    }

    return "available";
  };

  const handleProceedToBooking = () => {
    if (selectedSeats.length === 0) return;

    // Store selected seats and showtime in session storage for the booking confirmation page
    sessionStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    sessionStorage.setItem("showtime", JSON.stringify(showtime));

    navigate("/booking-confirmation");
  };

  // Format movie duration to hours and minutes
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">
            Error loading showtime details
          </h1>
          <p className="text-red-500 mb-6">{error}</p>
          <Button variant="default" asChild>
            <Link to={`/movies/${showtime?.movie?.id || ""}`}>
              Back to movie
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!showtime || !showtime.seat_layout) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">
            Showtime not found or has no seat layout
          </h1>
          <Button variant="default" asChild>
            <Link to="/movies">Back to movies</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Parse the rows from the seat layout
  const rows = showtime.seat_layout.rows.split(",");
  const seatsPerRow = showtime.seat_layout.seats_per_row;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" asChild className="mb-8">
        <Link
          to={`/movies/${showtime.movie.id}`}
          className="flex items-center gap-2"
        >
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
          Back to movie
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Movie Poster */}
              <div className="w-full md:w-1/4 flex-shrink-0">
                <img
                  src={`http://localhost:8000${showtime.movie.poster_url}`}
                  alt={showtime.movie.title}
                  className="w-full h-auto rounded-lg shadow-md object-cover"
                />
              </div>

              {/* Movie Details */}
              <div className="flex-grow">
                <h1 className="text-2xl font-bold mb-2">
                  {showtime.movie.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-1">
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
                      className="lucide lucide-calendar"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span>
                      {format(new Date(showtime.date), "EEEE, MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
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
                      className="lucide lucide-clock"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>
                      {format(
                        new Date(`${showtime.date}T${showtime.time}`),
                        "h:mm a"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
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
                      className="lucide lucide-video"
                    >
                      <path d="m22 8-6 4 6 4V8Z" />
                      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                    </svg>
                    <span>Screen {showtime.screen}</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                      className="lucide lucide-timer"
                    >
                      <path d="M10 2h4" />
                      <path d="M12 14v-4" />
                      <circle cx="12" cy="14" r="8" />
                    </svg>
                    <span>{formatDuration(showtime.movie.duration)}</span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-slate-700 mb-4">
                  {showtime.movie.short_description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-center">
              Select Your Seats
            </h2>

            {/* Screen */}
            <div className="w-3/4 h-8 bg-slate-800 mx-auto mb-12 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-medium">SCREEN</span>
            </div>

            {/* Seat Map */}
            <div className="mb-8">
              {rows.map((row) => (
                <div key={row} className="flex justify-center mb-2">
                  <div className="w-8 flex items-center justify-center font-medium text-slate-600">
                    {row}
                  </div>
                  <div className="flex gap-2">
                    {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map(
                      (number) => {
                        const seatId = `${row}${number}`;
                        const status = getSeatStatus(seatId);
                        return (
                          <button
                            key={seatId}
                            disabled={status === "booked"}
                            onClick={() => handleSeatClick(seatId)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
                              status === "available"
                                ? "bg-white border border-slate-300 hover:bg-blue-50 hover:border-blue-300"
                                : status === "selected"
                                ? "bg-blue-500 text-white border border-blue-500"
                                : "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed"
                            }`}
                          >
                            {number}
                          </button>
                        );
                      }
                    )}
                  </div>
                  <div className="w-8"></div>
                </div>
              ))}
            </div>

            {/* Seat Legend */}
            <div className="flex justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white border border-slate-300 rounded"></div>
                <span className="text-sm text-slate-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 border border-blue-500 rounded"></div>
                <span className="text-sm text-slate-600">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-200 border border-slate-300 rounded"></div>
                <span className="text-sm text-slate-600">Booked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div className="text-slate-600">Selected Seats</div>
              <div className="font-medium">
                {selectedSeats.length > 0
                  ? selectedSeats.join(", ")
                  : "None selected"}
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div className="text-slate-600">Number of Tickets</div>
              <div className="font-medium">{selectedSeats.length}</div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-bold">Total Amount</div>
              <div className="text-lg font-bold">
                ₹{selectedSeats.length * 190}
              </div>
            </div>

            <Button
              onClick={handleProceedToBooking}
              disabled={selectedSeats.length === 0}
              className="w-full"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
