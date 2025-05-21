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

/**
 * Get all upcoming showtimes
 * @param {Object} filters - Optional filters
 * @param {string} filters.date - Optional date filter (YYYY-MM-DD)
 * @returns {Promise<Array>} List of upcoming showtimes with movie details
 */
export const getUpcomingShowtimes = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    // Add date filter if provided
    if (filters.date) {
      params.append("date", filters.date);
    }

    // Request movie details to be included in response
    params.append("movieDetails", "true");

    const response = await api.get(
      `/api/movies/showtimes/?${params.toString()}`
    );

    const showtimes = response.data.results || [];

    // Transform the response to have movie property contain movie_details
    return showtimes.map((showtime) => ({
      ...showtime,
      movie: showtime.movie_details,
    }));
  } catch (error) {
    const message =
      error.response?.data?.detail || "Failed to fetch upcoming showtimes";
    throw new Error(message);
  }
};

export { api };
