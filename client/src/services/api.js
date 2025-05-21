import { BACKEND_BASE_URL } from "@/constants";
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Get all movies from the server
 * @param {Object} filters - Optional filters for movies
 * @param {string} filters.title - Filter by movie title
 * @param {string} filters.genre - Filter by genre
 * @param {string} filters.release_date - Filter by release date
 * @param {number} filters.page - Page number for pagination
 * @returns {Promise<Object>} List of movies with pagination data
 */
export const getAllMovies = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    // Add search parameter for title
    if (filters.title) {
      params.append("search", filters.title);
    }

    // Add filter parameters
    if (filters.genre) {
      params.append("genre", filters.genre);
    }

    if (filters.release_date) {
      params.append("release_date", filters.release_date);
    }

    // Add pagination parameter
    if (filters.page) {
      params.append("page", filters.page);
    }

    // Add ordering if specified
    if (filters.ordering) {
      params.append("ordering", filters.ordering);
    }

    const response = await api.get(
      `/api/movies/${params.toString() ? `?${params.toString()}` : ""}`
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.detail || "Failed to fetch movies";
    throw new Error(message);
  }
};

/**
 * Get a movie by its ID
 * @param {string|number} id - The ID of the movie to fetch
 * @returns {Promise<Object>} Movie details
 */
export const getMovieById = async (id) => {
  try {
    const response = await api.get(`/api/movies/${id}/`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.detail || "Failed to fetch movie details";
    throw new Error(message);
  }
};

/**
 * Get showtimes for a movie
 * @param {string|number} movieId - The ID of the movie
 * @param {string} date - Optional date filter (YYYY-MM-DD)
 * @returns {Promise<Array>} List of showtimes
 */
export const getShowtimes = async (movieId, date = null) => {
  try {
    const params = new URLSearchParams();
    params.append("movie", movieId);

    if (date) {
      params.append("date", date);
    }

    const response = await api.get(
      `/api/movies/showtimes/?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.detail || "Failed to fetch showtimes";
    throw new Error(message);
  }
};

/**
 * Get showtime details including available and booked seats
 * @param {string|number} showtimeId - The ID of the showtime
 * @returns {Promise<Object>} Showtime details with seats
 */
export const getShowtimeDetails = async (showtimeId) => {
  try {
    const response = await api.get(`/api/movies/showtimes/${showtimeId}/`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.detail || "Failed to fetch showtime details";
    throw new Error(message);
  }
};

/**
 * Create a new booking
 * @param {Object} bookingData - The booking data
 * @param {string} bookingData.user_email - User email
 * @param {string} bookingData.user_name - User name
 * @param {number} bookingData.showtime - Showtime ID
 * @param {Array<string>} bookingData.seats - Array of seat IDs (e.g. ["A1", "B5"])
 * @param {number} bookingData.amount_paid - Amount paid
 * @returns {Promise<Object>} Created booking
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post(
      "/api/movies/bookings/create/",
      bookingData
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.detail || "Failed to create booking";
    throw new Error(message);
  }
};

/**
 * Get bookings for a user
 * @param {string} userEmail - User email
 * @returns {Promise<Array>} List of bookings
 */
export const getUserBookings = async (userEmail) => {
  try {
    const params = new URLSearchParams();
    params.append("user_email", userEmail);

    const response = await api.get(
      `/api/movies/bookings/?${params.toString()}`
    );
    // Return the results array from the paginated response
    return response.data.results || [];
  } catch (error) {
    const message = error.response?.data?.detail || "Failed to fetch bookings";
    throw new Error(message);
  }
};

export { api };

// import { jwtDecode } from "jwt-decode";
/* Authentication-related code (commented out)
// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/account/token/refresh/`,
      {
        refresh: refreshToken,
      }
    );
    const { access } = response.data;
    let decodedToken = jwtDecode(access);

    // Update local storage with the new values
    localStorage.setItem("token", access);
    localStorage.setItem("userData", JSON.stringify(decodedToken));

    return access;
  } catch (error) {
    // Handle refresh token expiry or other errors
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userData");
    window.location.href = "/login"; // Redirect to login if refresh fails
    return Promise.reject(error);
  }
};

// Request interceptor to attach Authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (response && response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
*/
