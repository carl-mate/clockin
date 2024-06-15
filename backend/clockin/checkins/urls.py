from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CheckinViewSet

router = DefaultRouter()
router.register(r'checkins', CheckinViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
