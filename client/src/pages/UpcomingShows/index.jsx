import React from "react";

export default function UpcomingShows() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Shows</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">
          Stay tuned for our upcoming movie releases and shows! This section
          will soon be populated with a list of upcoming movies and events.
        </p>

        <div className="mt-8 p-8 border border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-gray-500">
              Our upcoming shows feature is currently under development. Check
              back later for exciting new releases!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
