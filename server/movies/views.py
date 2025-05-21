from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters as rest_filters
from .models import Movie
from .serializers import MovieSerializer, MovieDetailSerializer
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
