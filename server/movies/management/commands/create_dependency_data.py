import os
import random
from django.core.management.base import BaseCommand
from django.conf import settings
from movies.models import Movie, SeatLayout, Showtime, Booking
from datetime import date, datetime, timedelta, time

class Command(BaseCommand):
    help = 'Creates dummy movie data using existing poster files'

    def handle(self, *args, **options):
        # Clear existing data
        self.stdout.write(self.style.WARNING('Clearing existing data...'))
        Booking.objects.all().delete()
        Showtime.objects.all().delete()
        SeatLayout.objects.all().delete()
        # We're keeping the movies
        
        self.create_seat_layouts()
        self.create_showtimes()
        self.create_bookings()
        
        self.stdout.write(self.style.SUCCESS('Successfully created all sample data'))

    def create_seat_layouts(self):
        # Create different seat layouts
        layouts = [
            {"name": "Standard", "rows": "A,B,C,D,E,F,G,H", "seats_per_row": 10},
            {"name": "IMAX", "rows": "A,B,C,D,E,F,G,H,I,J", "seats_per_row": 15},
            {"name": "VIP", "rows": "A,B,C,D", "seats_per_row": 8},
        ]
        
        for layout_data in layouts:
            SeatLayout.objects.create(
                name=layout_data["name"],
                rows=layout_data["rows"],
                seats_per_row=layout_data["seats_per_row"]
            )
            
        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(layouts)} seat layouts'))
        
    def create_showtimes(self):
        movies = Movie.objects.all()
        if not movies:
            self.stdout.write(self.style.ERROR('No movies found. Please create movies first.'))
            return
            
        seat_layouts = SeatLayout.objects.all()
        if not seat_layouts:
            self.stdout.write(self.style.ERROR('No seat layouts found. Please create seat layouts first.'))
            return
            
        screens = ["Screen 1", "Screen 2", "Screen 3", "IMAX", "VIP"]
        show_times = [
            time(10, 0),  # 10:00 AM
            time(13, 0),  # 1:00 PM
            time(16, 0),  # 4:00 PM
            time(19, 0),  # 7:00 PM
            time(22, 0),  # 10:00 PM
        ]
        
        # Create showtimes for the next 7 days
        showtimes_created = 0
        today = date.today()
        
        for movie in movies:
            # Each movie gets 1-3 showtimes per day for the next 7 days
            for day_offset in range(7):
                showtime_date = today + timedelta(days=day_offset)
                num_showtimes = random.randint(1, 3)
                
                # Randomly select times for this movie on this day
                selected_times = random.sample(show_times, num_showtimes)
                selected_screens = random.sample(screens, num_showtimes)
                
                for i in range(num_showtimes):
                    # Select appropriate seat layout based on screen
                    if selected_screens[i] == "IMAX":
                        seat_layout = SeatLayout.objects.get(name="IMAX")
                    elif selected_screens[i] == "VIP":
                        seat_layout = SeatLayout.objects.get(name="VIP")
                    else:
                        seat_layout = SeatLayout.objects.get(name="Standard")
                    
                    Showtime.objects.create(
                        movie=movie,
                        date=showtime_date,
                        time=selected_times[i],
                        screen=selected_screens[i],
                        seat_layout=seat_layout,
                        booked_seats=[]  # Initially no seats are booked
                    )
                    showtimes_created += 1
                    
        self.stdout.write(self.style.SUCCESS(f'Successfully created {showtimes_created} showtimes'))
        
    def create_bookings(self):
        showtimes = Showtime.objects.all()
        if not showtimes:
            self.stdout.write(self.style.ERROR('No showtimes found. Please create showtimes first.'))
            return
            
        # Sample user data
        user_names = [
            "Ganesh Kumar", "Saraswathi Selvam", "Murugan Mani", "Kaveri Kannan",
            "Rajesh Ramasamy", "Shanthi Shanmugam", "Thamizhselvan Thanapalan", "Priya Balasubramanian",
            "Karthikeyan Kannan", "Nithya Narayanan", "Sathya Shanmugam", "Parvathi Balakrishnan"
        ]
        
        email_domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "example.com"]
        
        bookings_created = 0
        
        # Create 30-50 bookings
        num_bookings = random.randint(30, 50)
        
        for _ in range(num_bookings):
            try:
                # Select a random showtime
                showtime = random.choice(showtimes)
                
                # Skip if no seat layout
                if not showtime.seat_layout:
                    continue
                    
                # Get available seats for this showtime
                available_seats = showtime.get_available_seats()
                
                if len(available_seats) < 1:
                    continue  # Skip if no available seats
                    
                # Select 1-4 random seats (or as many as available)
                num_seats = min(random.randint(1, 4), len(available_seats))
                selected_seats = random.sample(available_seats, num_seats)
                
                # Create a random user
                user_name = random.choice(user_names)
                email_domain = random.choice(email_domains)
                email = f"{user_name.lower().replace(' ', '.')}@{email_domain}"
                
                # Create the booking
                booking = Booking.objects.create(
                    user_name=user_name,
                    user_email=email,
                    showtime=showtime,
                    seats=selected_seats,
                    amount_paid=num_seats * 190.00  # ₹190 per ticket
                )
                
                bookings_created += 1
                
                # Print progress every 10 bookings
                if bookings_created % 10 == 0:
                    self.stdout.write(f"Created {bookings_created} bookings so far...")
                    
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error creating booking: {str(e)}"))
                continue
                
        self.stdout.write(self.style.SUCCESS(f'Successfully created {bookings_created} bookings')) 