from rest_framework import serializers
from .models import Movie

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