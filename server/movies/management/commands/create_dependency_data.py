import os
import random
from django.core.management.base import BaseCommand
from django.conf import settings
from movies.models import Movie

class Command(BaseCommand):
    help = 'Creates dummy movie data using existing poster files'

    def handle(self, *args, **options):
        # Clear existing movies
        Movie.objects.all().delete()
        
        # Define some dummy data
        movie_titles = [
            "The Last Adventure", "Midnight Express", "Eternal Sunshine",
            "Lost in Translation", "The Grand Journey", "Starlight Chronicles",
            "Urban Legends", "Whispers in the Dark", "Ocean's Symphony",
            "Desert Mirage", "Mountain Peak", "Frozen Time",
            "Digital Dreams", "Neon Nights", "Echoes of Yesterday",
            "Future Perfect", "Hidden Valley", "The Secret Code",
            "Silent Witness", "Golden Horizon"
        ]
        
        descriptions = [
            "A thrilling adventure that takes you to the edge of your seat.",
            "A heartwarming story about love and redemption.",
            "An epic journey through time and space.",
            "A mysterious tale of intrigue and suspense.",
            "A comedy that will leave you in stitches.",
            "A dramatic portrayal of life's greatest challenges.",
            "A sci-fi adventure in a distant galaxy.",
            "A fantasy world where magic and reality collide.",
            "A documentary exploring the wonders of nature.",
            "A romantic story about finding love in unexpected places."
        ]
        
        # Get all poster files from media/movie-posters directory
        poster_dir = os.path.join(settings.MEDIA_ROOT, 'movie-posters')
        poster_files = [f for f in os.listdir(poster_dir) if os.path.isfile(os.path.join(poster_dir, f))]
        
        movies_created = []
        
        # Create a movie for each poster
        for i, poster_file in enumerate(poster_files):
            # Create a movie with random title and description
            title = movie_titles[i % len(movie_titles)]
            description = random.choice(descriptions)
            
            # Create the movie in database
            movie = Movie.objects.create(
                title=f"{title} {i+1}",
                description=description,
                poster=f'movie-posters/{poster_file}'
            )
            
            movies_created.append(movie.title)
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(movies_created)} dummy movies')) 