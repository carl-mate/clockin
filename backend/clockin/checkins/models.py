from django.db import models
from django.contrib.auth.models import User


class Checkin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hours = models.DecimalField(max_digits=5, decimal_places=2)
    tag = models.CharField(max_length=50)
    activity = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.hours} hrs #{self.tag} {self.activity}"
