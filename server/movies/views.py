from rest_framework import generics
from .models import Movie
from .serializers import MovieSerializer

class MovieListAPIView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
