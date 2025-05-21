from django.db import models
import os

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
