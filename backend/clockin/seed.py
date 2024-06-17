import decimal
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth.models import User
from django_seed import Seed
from checkins.models import Checkin

seeder = Seed.seeder()
seeder.faker.seed_instance()  # Add this line to use the same seed for consistent data


def seed_checkins(user_id, number_of_checkins):
    user = User.objects.get(id=user_id)
    # Adjust the date range as needed

    seeder.add_entity(Checkin, number_of_checkins, {
        'user': user,
        'hours': lambda x: decimal.Decimal(seeder.faker.random_int(1, 8)) / 2,
        'tag': lambda x: seeder.faker.word(),
        'activity': lambda x: seeder.faker.sentence(),
    })
    inserted_pks = seeder.execute()
    return inserted_pks
