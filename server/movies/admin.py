from django.contrib import admin
from .models import Movie, SeatLayout, Showtime, Booking

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('created_at',)

@admin.register(SeatLayout)
class SeatLayoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'rows', 'seats_per_row')

@admin.register(Showtime)
class ShowtimeAdmin(admin.ModelAdmin):
    list_display = ('movie', 'date', 'time', 'screen', 'seat_layout')
    list_filter = ('date', 'movie', 'seat_layout')
    search_fields = ('movie__title',)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'user_email', 'showtime', 'booking_time', 'amount_paid', 'display_seats')
    list_filter = ('booking_time',)
    search_fields = ('user_name', 'user_email', 'showtime__movie__title')
    
    def display_seats(self, obj):
        return ", ".join(obj.seats)
    display_seats.short_description = 'Seats'
