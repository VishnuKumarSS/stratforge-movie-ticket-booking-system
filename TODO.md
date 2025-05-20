# 🎟️ Movie Ticket Booking System

### ⏰ Time Required: 60 - 100 hours

---

## 👋 Introduction

Welcome coder 👩‍💻👨‍💻

For this challenge, you need to develop a full stack **Movie Ticket Booking System**.

We will assess the following:

1. Coding standards
2. Best practices
3. Authenticity
4. Complexity (optimal code)
5. Effective use of data structures
6. Reusability of code
7. Innovation

---

## ⚔️ Challenge

![Important!](https://img.shields.io/badge/Important-Read%20the%20challenge%20thoroughly%20before%20proceeding-red?style=for-the-badge&logo=react&link=# "Important")

You are tasked with developing a **Movie Ticket Booking System** that allows users to browse movies, select seats, and book tickets. Below is a detailed breakdown of the mandatory, good to have, and advanced features.

---

### 🏠 Home Page (Mandatory)

- This is the landing page of the application.
- Display a list of **movies** with details like the **name**, **description**, and **poster**.
- The page should contain the following **menu items**:
  - **Movies**
  - **Upcoming Shows**
  - **Booking History**

Each menu item will lead to a different section or page with related information.

- **Use React Router** for navigation between pages.
  - Example: `/movies` for listing all available movies.
  - Example: `/movies/{{movieId}}` for detailed information about a specific movie.

---

### 🎬 Movie Listings Page (Mandatory)

- This page will display a list of movies available for booking.
- Each movie should include:
  - Poster image
  - Movie name
  - Genre, duration, and short description
- **Filter**: Provide the ability to filter movies by name, genre, or release date.
- Ensure the UI is responsive and adjusts to screen size changes.

---

### 🎟️ Seat Selection Page (Mandatory)

- When a user selects a movie, they should be redirected to a seat selection page for a specific **showtime**.
- Display a seat map where:
  - Users can select available seats.
  - Differentiate between available, booked, and selected seats.
- Handle seat reservation logic with basic availability checks.
- Once seats are selected, the user can proceed to book them.

---

### 💳 Booking Confirmation Page (Mandatory)

- After seat selection, users can confirm their booking.
- This page should show:
  - Movie details
  - Selected seats
  - Total amount to be paid
- Allow users to submit the booking.
- Store booking information in the database (user, movie, seat numbers, showtime).
- Show a **confirmation message** once the booking is completed.

---

### 📜 Booking History (Mandatory)

- Users should be able to view their past bookings.
- Display a list of their bookings with details:
  - Movie name
  - Date and time
  - Seat numbers
  - Total amount paid

---

## 🧰 Tools and Guidelines

### API

- You can use any mock data or a simple back-end API to serve the movie list, showtimes, and seat information.

### Tech Stack

- **Front-End**:
  - React
  - Tailwind CSS (for styling)
  - TypeScript (Mandatory)
- **Back-End** (optional if using full-stack):
  - Any JS or Python framework.

### Recommendations

- Make sure your code is clean and well-organized.
- Add a detailed `README.md` explaining:
  - Your choice of frameworks and libraries.
  - The architecture of the app.
  - Areas of improvement if time was limited.

---

## 🏗️ Good to Have Features

### 🛠️ Admin Panel

- Allow admins to:
  - Add or remove movies.
  - Set available showtimes.
  - Manage seat availability (e.g., mark seats as unavailable for maintenance).

### 🔍 Search and Filter

- Add search and filter options to allow users to search for specific movies or filter them by:
  - Release date
  - Genre
  - City (if multi-city booking system)

### 📝 Front-end Form Validation

- Add client-side validation for:
  - User registration and login forms.
  - Seat selection and booking forms (e.g., ensure seats are selected before proceeding).

---

## 🚀 Deployment (Optional)

- Deploy your application to a live environment.
  - Front-End: Vercel or Netlify.
  - Back-End: Heroku, Render or any hosting platform.
- If not able to deploy, we'll review in your local environment.

---

## 📜 Guidelines

- Make sure your code is clean
- Commit your code as a public repository on GitHub and share the link with us
- Make sure the UI looks good - with respect to color theming, fonts, sizing and responsiveness
- Keep use of other libraries to a minimum (only essentials). We prefer that you don't use any 3rd party css/component libraries
- Keep your README.md detailed and explain on
  - Your choice of frameworks
  - Architecture
  - If short on time, you can explain how you can improve on the application

Show-off your skills! 🔥