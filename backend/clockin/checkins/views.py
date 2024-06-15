from rest_framework import viewsets
from .models import Checkin
from .serializers import CheckinSerializer
from rest_framework.permissions import IsAuthenticated


class CheckinViewSet(viewsets.ModelViewSet):
    queryset = Checkin.objects.all()
    serializer_class = CheckinSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Checkin.objects.filter(user=user)
