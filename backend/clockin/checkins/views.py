from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Sum
from django.db.models.functions import TruncDay
from .models import Checkin
from .serializers import CheckinSerializer


class CheckinPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class CheckinViewSet(viewsets.ModelViewSet):
    queryset = Checkin.objects.all()
    serializer_class = CheckinSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CheckinPagination

    def get_queryset(self):
        user = self.request.user
        return Checkin.objects.filter(user=user)

    @action(detail=False, methods=['get'])
    def dashboard_data(self, request):
        user = self.request.user

        # Total Time Invested
        total_time = Checkin.objects.filter(user=user).aggregate(
            total_hours=Sum('hours'))['total_hours'] or 0

        # Total Number of Checkins
        total_checkins = Checkin.objects.filter(user=user).count()

        # Time Allocation (grouped by tag)
        time_allocation = (
            Checkin.objects.filter(user=user)
            .values('tag')
            .annotate(total_hours=Sum('hours'))
            .order_by('-total_hours')
        )

        # Top Time Investments (top 5)
        top_time_investments = time_allocation[:5]

        # Time Trends (grouped by day)
        time_trends = (
            Checkin.objects.filter(user=user)
            .annotate(day=TruncDay('created_at'))
            .values('day')
            .annotate(total_hours=Sum('hours'))
            .order_by('day')
        )

        data = {
            'total_time': total_time,
            'total_checkins': total_checkins,
            'time_allocation': list(time_allocation),
            'top_time_investments': list(top_time_investments),
            'time_trends': list(time_trends),
        }

        return Response(data)
