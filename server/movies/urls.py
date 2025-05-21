from django.urls import path
from .views import (
    MovieListAPIView, MovieDetailAPIView,
    ShowtimeListAPIView, ShowtimeDetailAPIView,
    BookingListAPIView, BookingCreateAPIView
)

urlpatterns = [
    path('', MovieListAPIView.as_view(), name='movie-list'),
    path('<int:pk>/', MovieDetailAPIView.as_view(), name='movie-detail'),
    path('showtimes/', ShowtimeListAPIView.as_view(), name='showtime-list'),
    path('showtimes/<int:pk>/', ShowtimeDetailAPIView.as_view(), name='showtime-detail'),
    path('bookings/', BookingListAPIView.as_view(), name='booking-list'),
    path('bookings/create/', BookingCreateAPIView.as_view(), name='booking-create'),
] 