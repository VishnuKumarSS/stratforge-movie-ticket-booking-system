import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

import LandingPage from "@pages/LandingPage";
import Movies from "@pages/Movies";
import NotFound from "@pages/NotFound";
import MovieDetail from "@pages/MovieDetail";
import SeatSelection from "@pages/SeatSelection";
import BookingConfirmation from "@pages/BookingConfirmation";
import UpcomingShows from "@pages/UpcomingShows";
import BookingHistory from "@pages/BookingHistory";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Router>
        <Navbar />
        <main className="flex-grow py-8">
          <Routes>
            {/* Protected Routes that require authentication
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route> */}

            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetail />} />
            <Route
              path="/seat-selection/:showtimeId"
              element={<SeatSelection />}
            />
            <Route
              path="/booking-confirmation"
              element={<BookingConfirmation />}
            />
            <Route path="/upcoming-shows" element={<UpcomingShows />} />
            <Route path="/booking-history" element={<BookingHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
