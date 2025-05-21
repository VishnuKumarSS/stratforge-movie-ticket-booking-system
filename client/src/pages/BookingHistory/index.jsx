import React, { useState, useEffect } from "react";
import { getUserBookings } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  useEffect(() => {
    // Check if user email is stored in local storage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
      fetchBookings(storedEmail);
    }
  }, []);

  const fetchBookings = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserBookings(email);
      setBookings(data);
      setSearchSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userEmail) {
      fetchBookings(userEmail);
    }
  };

  const handleInputChange = (e) => {
    setUserEmail(e.target.value);
  };

  const formatSeatNumbers = (seats) => {
    // Seats are now just an array of strings like ["A1", "B5"]
    return seats.join(", ");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6">Booking History</h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 mb-8">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <Label htmlFor="userEmail" className="mb-2 block">
                    Enter your email to view your bookings
                  </Label>
                  <Input
                    id="userEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={userEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="md:self-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Search"}
                  </Button>
                </div>
              </div>
            </form>

            {error && (
              <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-md border border-red-200">
                {error}
              </div>
            )}

            {searchSubmitted && bookings.length === 0 && !loading && !error && (
              <div className="p-8 border border-dashed border-slate-300 rounded-lg text-center">
                <h2 className="text-xl font-semibold mb-2">
                  No Bookings Found
                </h2>
                <p className="text-slate-500 mb-4">
                  We couldn't find any bookings associated with this email.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/movies">Browse Movies</Link>
                </Button>
              </div>
            )}

            {bookings.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-slate-200 rounded-lg overflow-hidden"
                    >
                      <div className="bg-slate-50 p-4 border-b border-slate-200">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-lg">
                            {booking.showtime.movie.title}
                          </h3>
                          <span className="text-sm text-slate-500">
                            Booked on{" "}
                            {format(
                              new Date(booking.booking_time),
                              "MMM d, yyyy"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-500">
                              Date & Time
                            </p>
                            <p className="font-medium">
                              {format(
                                new Date(booking.showtime.date),
                                "EEEE, MMMM d, yyyy"
                              )}{" "}
                              at{" "}
                              {format(
                                new Date(
                                  `${booking.showtime.date}T${booking.showtime.time}`
                                ),
                                "h:mm a"
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Screen</p>
                            <p className="font-medium">
                              {booking.showtime.screen}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Seats</p>
                            <p className="font-medium">
                              {formatSeatNumbers(booking.seats)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">
                              Amount Paid
                            </p>
                            <p className="font-medium">
                              ₹{booking.amount_paid}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
