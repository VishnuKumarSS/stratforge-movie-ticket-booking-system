from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.utils.termcolors import colorize


class Command(BaseCommand):
    help = 'Initialize all application dependencies and initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write(colorize('Starting application initialization...', fg='cyan'))
        
        # List of all initialization commands to run
        initialization_commands = [
            'initialize_groups',
            # Add more initialization commands here as the application grows
            # e.g., 'create_default_settings', 'populate_categories', etc.
        ]
        
        for command in initialization_commands:
            self.stdout.write(colorize(f'Running {command}...', fg='yellow'))
            try:
                call_command(command)
                self.stdout.write(self.style.SUCCESS(f'Successfully executed {command}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error executing {command}: {str(e)}'))
        
        self.stdout.write(self.style.SUCCESS('Application initialization completed successfully')) 