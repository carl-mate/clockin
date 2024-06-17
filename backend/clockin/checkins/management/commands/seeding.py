from django.core.management.base import BaseCommand
from django_seed import Seed
from django.contrib.auth.models import User
from checkins.models import Checkin
import random


class Command(BaseCommand):
    help = 'Seed 1000 checkins for a specific user'

    def handle(self, *args, **kwargs):
        seeder = Seed.seeder()
        user_id = 1  # The ID of the specific user

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(
                f'User with ID {user_id} not found. Seeding skipped.'))
            return

        # Seed 1000 checkins for the specific user
        seeder.add_entity(Checkin, 1000, {
            'user': lambda x: user,
            'hours': lambda x: round(random.uniform(0.5, 12.0), 2),
            'tag': lambda x: seeder.faker.word(),
            'activity': lambda x: seeder.faker.sentence(),
            'created_at': lambda x: seeder.faker.date_time_this_year(),
        })

        inserted_pks = seeder.execute()
        self.stdout.write(self.style.SUCCESS(
            f'Successfully seeded 1000 checkins for user with ID {user_id}'))
