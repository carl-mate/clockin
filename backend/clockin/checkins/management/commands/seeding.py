# from django.contrib.auth.models import User
# from django.core.exceptions import ValidationError
# from django_seed import Seed
# from checkins.models import Checkin


# class CheckinSeeder(Seed):

#     def run(self, *args, **kwargs):
#         self.seeder = Seed.seeder()
#         # Existing primary key you want to seed data for
#         user_id = 1

#         try:
#             user = User.objects.get(id=user_id)
#         except User.DoesNotExist:
#             print(f"User with ID {user_id} not found. Seeding skipped.")
#             return  # Exit the function if user doesn't exist

#         # Generate data for 1000 checkins
#         data = []
#         for _ in range(1000):
#             data.append({
#                 'user': user,
#                 'hours': self.seeder.faker.pydecimal(positive=True, max_digits=3, decimal_places=2),
#                 'tag': self.seeder.faker.word(),
#                 'activity': self.seeder.faker.sentence(),
#             })

#         for item in data:
#             try:
#                 checkin = Checkin(**item)
#                 checkin.save()
#             except ValidationError as e:
#                 print(f"Error creating Checkin: {e}")
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
