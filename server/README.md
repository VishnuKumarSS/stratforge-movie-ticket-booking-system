# Server

## CURLs
```bash
# Get all movies
curl http://127.0.0.1:8000/api/movies/

# Get movie details by ID (replace 1 with actual movie ID)
curl http://127.0.0.1:8000/api/movies/1/

# Get all showtimes
curl http://127.0.0.1:8000/api/movies/showtimes/

# Get all showtimes with movie details
curl "http://127.0.0.1:8000/api/movies/showtimes/?movieDetails=true"

# Get showtimes for a specific movie (replace 1 with actual movie ID)
curl "http://127.0.0.1:8000/api/movies/showtimes/?movie=1"

# Get showtimes for a specific date (YYYY-MM-DD format)
curl "http://127.0.0.1:8000/api/movies/showtimes/?date=2023-08-15"

# Get showtime details by ID (replace 1 with actual showtime ID)
curl http://127.0.0.1:8000/api/movies/showtimes/1/

# Get bookings for a specific user email
curl "http://127.0.0.1:8000/api/movies/bookings/?user_email=user@example.com"

# Create a new booking
curl -X POST http://127.0.0.1:8000/api/movies/bookings/create/ \
  -H "Content-Type: application/json" \
  -d '{
    "user_email": "user@example.com",
    "user_name": "Test name",
    "showtime": 1,
    "seats": ["A1", "A2"]
  }'