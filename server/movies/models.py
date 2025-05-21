from django.db import models
import os
import json

class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    short_description = models.CharField(max_length=200, blank=True, null=True)
    genre = models.CharField(max_length=100, blank=True, null=True)
    duration = models.IntegerField(help_text="Duration in minutes", blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    # Metadata and Classification
    language = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    # People Involved
    director = models.CharField(max_length=100, blank=True, null=True)
    cast = models.TextField(blank=True, null=True)
    writers = models.TextField(blank=True, null=True)
    poster = models.ImageField(upload_to='movie-posters/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    @property
    def poster_url(self):
        if self.poster and hasattr(self.poster, 'url'):
            return self.poster.url
        return None

class SeatLayout(models.Model):
    name = models.CharField(max_length=50)  # e.g., "Standard", "IMAX", "VIP"
    rows = models.CharField(max_length=50)  # e.g., "A,B,C,D,E,F,G,H"
    seats_per_row = models.IntegerField(default=10)
    
    def __str__(self):
        return self.name
    
    def get_rows(self):
        return self.rows.split(',')
    
    def get_all_seats(self):
        """Returns a list of all seat identifiers in this layout"""
        seats = []
        for row in self.get_rows():
            for num in range(1, self.seats_per_row + 1):
                seats.append(f"{row}{num}")
        return seats

class Showtime(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='showtimes')
    date = models.DateField()
    time = models.TimeField()
    screen = models.CharField(max_length=50)
    seat_layout = models.ForeignKey(SeatLayout, on_delete=models.CASCADE, related_name='showtimes', null=True, blank=True)
    booked_seats = models.JSONField(default=list)  # Stores a list of booked seat IDs like ["A1", "B5", "C3"]
    
    def __str__(self):
        return f"{self.movie.title} - {self.date} {self.time} - {self.screen}"
    
    def is_seat_booked(self, seat_id):
        """Check if a specific seat is booked"""
        return seat_id in self.booked_seats
    
    def book_seats(self, seat_ids):
        """Book multiple seats"""
        for seat_id in seat_ids:
            if seat_id not in self.booked_seats:
                self.booked_seats.append(seat_id)
        self.save()
    
    def get_available_seats(self):
        """Get a list of available seat IDs"""
        if not self.seat_layout:
            return []
        all_seats = self.seat_layout.get_all_seats()
        return [seat for seat in all_seats if seat not in self.booked_seats]
    
    def get_booked_seats(self):
        """Get a list of booked seat IDs"""
        return self.booked_seats

class Booking(models.Model):
    user_email = models.EmailField()
    user_name = models.CharField(max_length=100)
    showtime = models.ForeignKey(Showtime, on_delete=models.CASCADE, related_name='bookings')
    seats = models.JSONField()  # Stores a list of seat IDs like ["A1", "B5", "C3"]
    booking_time = models.DateTimeField(auto_now_add=True)
    amount_paid = models.DecimalField(max_digits=8, decimal_places=2, default=190.00)
    
    def __str__(self):
        return f"{self.user_name} - {self.showtime}"
    
    def save(self, *args, **kwargs):
        # Book the seats in the showtime
        if not self.pk:  # Only when creating a new booking
            self.showtime.book_seats(self.seats)
        super().save(*args, **kwargs)
