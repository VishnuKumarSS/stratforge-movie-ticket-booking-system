from django.db import models
import os

class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    poster = models.ImageField(upload_to='movie-posters/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    @property
    def poster_url(self):
        if self.poster and hasattr(self.poster, 'url'):
            return self.poster.url
        return None
