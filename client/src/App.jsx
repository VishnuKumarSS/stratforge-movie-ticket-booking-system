import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

import LandingPage from "@pages/LandingPage";
import NotFound from "@pages/NotFound";

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
