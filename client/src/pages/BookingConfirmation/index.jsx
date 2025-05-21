import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createBooking } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const [showtime, setShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Get data from session storage
    const storedSeats = sessionStorage.getItem("selectedSeats");
    const storedShowtime = sessionStorage.getItem("showtime");

    if (!storedSeats || !storedShowtime) {
      navigate("/movies");
      return;
    }

    try {
      setSelectedSeats(JSON.parse(storedSeats));
      setShowtime(JSON.parse(storedShowtime));
    } catch (err) {
      console.error("Error parsing stored data:", err);
      navigate("/movies");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare booking data
      const bookingData = {
        user_name: formData.user_name,
        user_email: formData.user_email,
        showtime: showtime.id,
        seats: selectedSeats,
        amount_paid: selectedSeats.length * 190, // ₹190 per ticket
      };

      // Send booking request
      const response = await createBooking(bookingData);

      // Store user email in local storage for booking history
      localStorage.setItem("userEmail", formData.user_email);

      // Show success message
      setSuccessMessage("Your booking has been confirmed!");

      // Clear session storage
      setTimeout(() => {
        sessionStorage.removeItem("selectedSeats");
        sessionStorage.removeItem("showtime");
        navigate("/booking-history");
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to create booking");
      setIsSubmitting(false);
    }
  };

  if (!showtime || !selectedSeats.length) {
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
      <Button variant="outline" asChild className="mb-8">
        <Link
          to={`/seat-selection/${showtime.id}`}
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
          Back to seat selection
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        {successMessage ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">{successMessage}</h2>
            <p className="text-slate-600 mb-6">
              Redirecting you to your booking history...
            </p>
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 mb-8">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">
                  Confirm Your Booking
                </h1>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Movie Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-500">Movie</p>
                      <p className="font-medium">{showtime.movie.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Date & Time</p>
                      <p className="font-medium">
                        {format(new Date(showtime.date), "EEEE, MMMM d, yyyy")}{" "}
                        at{" "}
                        {format(
                          new Date(`${showtime.date}T${showtime.time}`),
                          "h:mm a"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Screen</p>
                      <p className="font-medium">{showtime.screen}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Selected Seats</p>
                      <p className="font-medium">
                        {selectedSeats
                          .map((seat) => `${seat.row}${seat.number}`)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Payment Summary
                  </h2>
                  <div className="flex justify-between mb-2">
                    <p className="text-slate-600">Ticket Price</p>
                    <p>₹190 x {selectedSeats.length}</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-slate-100">
                    <p>Total</p>
                    <p>₹{selectedSeats.length * 190}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 mb-8">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Enter Your Details
                </h2>

                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="mb-4">
                    <Label htmlFor="user_name" className="block mb-2">
                      Full Name
                    </Label>
                    <Input
                      id="user_name"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="user_email" className="block mb-2">
                      Email Address
                    </Label>
                    <Input
                      id="user_email"
                      name="user_email"
                      type="email"
                      value={formData.user_email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      We'll send your booking confirmation to this email
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Confirm & Pay ₹" + selectedSeats.length * 190
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
