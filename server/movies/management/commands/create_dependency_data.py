import os
import random
from django.core.management.base import BaseCommand
from django.conf import settings
from movies.models import Movie
from datetime import date, timedelta

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
        
        # Tamil movie titles
        tamil_movie_titles = [
            "Vaanam", "Kadhal Kottai", "Alaipayuthey", "Kannathil Muthamittal", 
            "Nayakan", "Bombay", "Anbe Sivam", "Pithamagan", "Vinnaithaandi Varuvaayaa",
            "Kaaka Muttai", "Pariyerum Perumal", "Asuran", "Soorarai Pottru", "Kaithi"
        ]
        
        descriptions = [
            "A thrilling adventure that takes you to the edge of your seat. Follow the protagonist through a series of unexpected twists and turns as they navigate treacherous terrain and face formidable foes in this action-packed journey of survival and redemption.",
            "A heartwarming story about love and redemption that spans generations. Set against the backdrop of a changing world, this emotional tale explores the depths of human connection and the power of forgiveness in healing old wounds.",
            "An epic journey through time and space that challenges our understanding of reality. As dimensions collide and timelines intersect, the characters must confront existential questions about destiny, free will, and the nature of consciousness.",
            "A mysterious tale of intrigue and suspense set in a small town with dark secrets. When a stranger arrives and begins asking questions about a long-forgotten incident, buried truths emerge that threaten to unravel the community's carefully constructed facade.",
            "A comedy that will leave you in stitches as it follows the misadventures of an unlikely group of friends. Through hilarious mishaps and witty dialogue, the film delivers a poignant message about friendship and accepting our imperfections.",
            "A dramatic portrayal of life's greatest challenges and the resilience of the human spirit. Based on true events, this powerful narrative examines how ordinary people find extraordinary courage when faced with overwhelming adversity.",
            "A sci-fi adventure in a distant galaxy where advanced civilizations battle for control of rare resources. Amidst political intrigue and spectacular space battles, a reluctant hero emerges to challenge the established order and fight for a more just future.",
            "A fantasy world where magic and reality collide, forcing the inhabitants to question everything they thought they knew. Ancient prophecies, mythical creatures, and forbidden spells create a rich tapestry of wonder and danger in this immersive tale.",
            "A documentary exploring the wonders of nature and the urgent need for conservation efforts. Through stunning cinematography and expert testimony, viewers witness both the breathtaking beauty of our planet and the devastating impact of human activity.",
            "A romantic story about finding love in unexpected places that defies conventional expectations. Two people from different worlds form a connection that transcends cultural barriers, social pressures, and personal fears, showing that true love knows no boundaries."
        ]
        
        # Tamil movie descriptions
        tamil_descriptions = [
            "A powerful Tamil drama exploring the complex social dynamics of rural Tamil Nadu, where ancient traditions clash with modern aspirations. The protagonist's journey illuminates the struggles and resilience of a community in transition.",
            "An emotional Tamil family saga spanning three generations, weaving together themes of love, sacrifice, and cultural identity against the backdrop of significant historical events that shaped Tamil society.",
            "A visually stunning Tamil musical romance that follows two star-crossed lovers from different castes as they navigate social prejudices and family opposition to fight for their relationship in contemporary Chennai.",
            "A gripping Tamil thriller set in the bustling streets of Madurai, where a former gangster attempts to leave his violent past behind but gets pulled back into the underworld to protect his family from emerging threats.",
            "A heartwarming Tamil coming-of-age story about childhood friendship in a coastal fishing village, capturing the innocence, mischief, and profound bonds that form during formative years against a backdrop of economic hardship.",
            "An action-packed Tamil historical epic depicting the valiant struggle of ancient Tamil warriors defending their kingdom against colonial invaders, showcasing traditional martial arts and cultural heritage.",
            "A thought-provoking Tamil social commentary that examines caste discrimination through the eyes of a young student who challenges entrenched prejudices at a prestigious college, inspiring a movement for equality.",
            "A lighthearted Tamil comedy about a middle-class family's misadventures as they navigate modern life in Chennai, blending humor with insightful observations about contemporary Tamil society and values."
        ]
        
        short_descriptions = [
            "Thrilling adventure",
            "Heartwarming love story",
            "Epic time journey",
            "Mystery and suspense",
            "Hilarious comedy",
            "Dramatic life story",
            "Sci-fi space adventure",
            "Fantasy and magic",
            "Nature documentary",
            "Unexpected romance"
        ]
        
        # Tamil short descriptions
        tamil_short_descriptions = [
            "Powerful social drama",
            "Emotional family saga",
            "Musical star-crossed romance",
            "Gangster redemption thriller",
            "Coastal village coming-of-age",
            "Historical warrior epic",
            "Anti-caste social commentary",
            "Middle-class family comedy"
        ]
        
        genres = [
            "Action", "Adventure", "Comedy", "Drama", "Fantasy",
            "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"
        ]
        
        languages = [
            "English", "Spanish", "French", "German", "Italian", 
            "Japanese", "Korean", "Chinese", "Hindi", "Russian", "Tamil"
        ]
        
        countries = [
            "United States", "United Kingdom", "France", "Germany", "Italy",
            "Spain", "Japan", "South Korea", "India", "Canada", "Australia"
        ]
        
        directors = [
            "Christopher Nolan", "Steven Spielberg", "Martin Scorsese", 
            "Quentin Tarantino", "James Cameron", "Greta Gerwig",
            "Bong Joon-ho", "Denis Villeneuve", "Ava DuVernay", "Spike Lee"
        ]
        
        # Tamil directors
        tamil_directors = [
            "Mani Ratnam", "Vetrimaaran", "Pa. Ranjith", "Karthik Subbaraj",
            "Gautham Vasudev Menon", "Selvaraghavan", "Ram", "Mari Selvaraj",
            "Sudha Kongara", "Lokesh Kanagaraj"
        ]
        
        actors = [
            "Tom Hanks", "Meryl Streep", "Leonardo DiCaprio", "Viola Davis",
            "Denzel Washington", "Jennifer Lawrence", "Brad Pitt", "Cate Blanchett",
            "Robert Downey Jr.", "Emma Stone", "Idris Elba", "Scarlett Johansson",
            "Ryan Gosling", "Lupita Nyong'o", "Christian Bale", "Zendaya"
        ]
        
        # Tamil actors
        tamil_actors = [
            "Rajinikanth", "Kamal Haasan", "Vijay", "Ajith Kumar", "Suriya",
            "Dhanush", "Vikram", "Sivakarthikeyan", "Vijay Sethupathi", 
            "Karthi", "Nayanthara", "Trisha Krishnan", "Jyothika", 
            "Samantha Ruth Prabhu", "Aishwarya Rajesh", "Sai Pallavi"
        ]
        
        writers = [
            "Aaron Sorkin", "Quentin Tarantino", "Nora Ephron", "Charlie Kaufman",
            "Jordan Peele", "Greta Gerwig", "Spike Lee", "Sofia Coppola",
            "Phoebe Waller-Bridge", "Taika Waititi"
        ]
        
        # Tamil writers
        tamil_writers = [
            "Jeyamohan", "Sujatha", "Balakumaran", "S. Ramakrishnan",
            "Jayakanthan", "Kalki Krishnamurthy", "Vetrimaaran", "Mani Ratnam"
        ]
        
        # Get all poster files from media/movie-posters directory
        poster_dir = os.path.join(settings.MEDIA_ROOT, 'movie-posters')
        poster_files = [f for f in os.listdir(poster_dir) if os.path.isfile(os.path.join(poster_dir, f))]
        
        movies_created = []
        
        # Create a movie for each poster
        for i, poster_file in enumerate(poster_files):
            # Decide if this will be a Tamil movie (roughly 30% chance)
            is_tamil = random.random() < 0.3
            
            if is_tamil:
                title = tamil_movie_titles[i % len(tamil_movie_titles)]
                description = random.choice(tamil_descriptions)
                short_description = random.choice(tamil_short_descriptions)
                language = "Tamil"
                country = "India"
                director = random.choice(tamil_directors)
                
                # Generate 3-5 random Tamil cast members
                num_cast = random.randint(3, 5)
                cast_members = random.sample(tamil_actors, num_cast)
                cast = ", ".join(cast_members)
                
                # Generate 1-3 random Tamil writers
                num_writers = random.randint(1, 3)
                movie_writers = random.sample(tamil_writers, num_writers)
                movie_writers_text = ", ".join(movie_writers)
            else:
                # Create a movie with random title and description
                title = movie_titles[i % len(movie_titles)]
                description = random.choice(descriptions)
                short_description = random.choice(short_descriptions)
                language = random.choice([l for l in languages if l != "Tamil"])
                country = random.choice(countries)
                director = random.choice(directors)
                
                # Generate 3-5 random cast members
                num_cast = random.randint(3, 5)
                cast_members = random.sample(actors, num_cast)
                cast = ", ".join(cast_members)
                
                # Generate 1-3 random writers
                num_writers = random.randint(1, 3)
                movie_writers = random.sample(writers, num_writers)
                movie_writers_text = ", ".join(movie_writers)
            
            genre = random.choice(genres)
            duration = random.randint(90, 180)  # Movie duration between 90 and 180 minutes
            
            # Random release date in the last 10 years
            days_back = random.randint(0, 365 * 10)
            release_date = date.today() - timedelta(days=days_back)
            
            # Create the movie in database
            movie = Movie.objects.create(
                title=f"{title}",
                description=description,
                short_description=short_description,
                genre=genre,
                duration=duration,
                release_date=release_date,
                language=language,
                country=country,
                director=director,
                cast=cast,
                writers=movie_writers_text,
                poster=f'movie-posters/{poster_file}'
            )
            
            movies_created.append(movie.title)
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(movies_created)} dummy movies')) 