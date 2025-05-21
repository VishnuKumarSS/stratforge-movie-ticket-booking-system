from rest_framework import serializers
from .models import Movie, SeatLayout, Showtime, Booking

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'short_description', 'genre', 'duration', 'release_date', 'poster_url', 'created_at']

class MovieDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'short_description', 'genre', 
                 'duration', 'release_date', 'language', 'country', 'director', 
                 'cast', 'writers', 'poster_url', 'created_at'] 

class SeatLayoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeatLayout
        fields = ['id', 'name', 'rows', 'seats_per_row']

class ShowtimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Showtime
        fields = ['id', 'movie', 'date', 'time', 'screen', 'seat_layout']

class ShowtimeWithMovieSerializer(serializers.ModelSerializer):
    movie_details = MovieSerializer(source='movie', read_only=True)
    
    class Meta:
        model = Showtime
        fields = ['id', 'movie', 'movie_details', 'date', 'time', 'screen', 'seat_layout']

class ShowtimeDetailSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)
    seat_layout = SeatLayoutSerializer(read_only=True)
    available_seats = serializers.SerializerMethodField()
    booked_seats = serializers.SerializerMethodField()
    
    class Meta:
        model = Showtime
        fields = ['id', 'movie', 'date', 'time', 'screen', 'seat_layout', 'available_seats', 'booked_seats']
    
    def get_available_seats(self, obj):
        return obj.get_available_seats()
    
    def get_booked_seats(self, obj):
        return obj.get_booked_seats()

class BookingSerializer(serializers.ModelSerializer):
    showtime = ShowtimeSerializer(read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'user_email', 'user_name', 'showtime', 'seats', 'booking_time', 'amount_paid']
        
class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['user_email', 'user_name', 'showtime', 'seats', 'amount_paid']
        
    def validate_seats(self, value):
        """Validate that the seats are available"""
        showtime = self.initial_data.get('showtime')
        if not showtime:
            raise serializers.ValidationError("Showtime is required")
            
        try:
            showtime_obj = Showtime.objects.get(id=showtime)
        except Showtime.DoesNotExist:
            raise serializers.ValidationError("Invalid showtime")
            
        # Check if all seats are available
        for seat in value:
            if seat in showtime_obj.booked_seats:
                raise serializers.ValidationError(f"Seat {seat} is already booked")
                
        return value 