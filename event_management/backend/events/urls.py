from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    EventViewSet,
    AttendeeViewSet,
    TaskViewSet,
    RegisterUserView,
    LoginView,
)

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'attendees', AttendeeViewSet)
router.register(r'tasks', TaskViewSet)

# Adding custom routes for user registration and login
urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
    path('attendees/', AttendeeViewSet.as_view({'post': 'create'}), name='attendee-create'),
]

urlpatterns += router.urls
