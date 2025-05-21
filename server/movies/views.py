from rest_framework import generics, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters as rest_filters
from rest_framework.response import Response
from .models import Movie, SeatLayout, Showtime, Booking
from .serializers import (
    MovieSerializer, MovieDetailSerializer, 
    ShowtimeSerializer, ShowtimeDetailSerializer,
    BookingSerializer, BookingCreateSerializer
)
from django_filters import rest_framework as filters
from django.db.models import Q
import datetime

class MovieFilter(filters.FilterSet):
    release_date = filters.CharFilter(method='filter_by_year')
    
    def filter_by_year(self, queryset, name, value):
        try:
            year = int(value)
            # Filter movies by the specified year
            return queryset.filter(
                Q(release_date__year=year)
            )
        except (ValueError, TypeError):
            # If the value is not a valid year, return the original queryset
            return queryset
    
    class Meta:
        model = Movie
        fields = ['genre', 'release_date']

class MovieListAPIView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [DjangoFilterBackend, rest_filters.SearchFilter, rest_filters.OrderingFilter]
    filterset_class = MovieFilter
    search_fields = ['title']
    ordering_fields = ['title', 'release_date']

class MovieDetailAPIView(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieDetailSerializer
    lookup_field = 'pk'

class ShowtimeListAPIView(generics.ListAPIView):
    serializer_class = ShowtimeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['movie', 'date']
    
    def get_queryset(self):
        return Showtime.objects.all()

class ShowtimeDetailAPIView(generics.RetrieveAPIView):
    queryset = Showtime.objects.all()
    serializer_class = ShowtimeDetailSerializer
    lookup_field = 'pk'

class BookingListAPIView(generics.ListAPIView):
    serializer_class = BookingSerializer
    
    def get_queryset(self):
        user_email = self.request.query_params.get('user_email', None)
        if user_email:
            return Booking.objects.filter(user_email=user_email)
        return Booking.objects.none()

class BookingCreateAPIView(generics.CreateAPIView):
    serializer_class = BookingCreateSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Return the created booking with full details
        booking = Booking.objects.get(id=serializer.instance.id)
        response_serializer = BookingSerializer(booking)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
