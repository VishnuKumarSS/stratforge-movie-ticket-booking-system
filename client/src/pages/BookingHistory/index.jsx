import React from "react";

export default function BookingHistory() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Booking History</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-6">
          View your booking history below. This page will display all your past
          movie bookings and ticket purchases.
        </p>

        <div className="mt-4 p-8 border border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">No Bookings Found</h2>
            <p className="text-gray-500">
              You haven't made any bookings yet. Browse our movies and book your
              first show!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
