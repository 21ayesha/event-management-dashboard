# events/views.py

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action

from .models import Event, Attendee, Task
from .serializers import EventSerializer, AttendeeSerializer, TaskSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['date', 'location']
    search_fields = ['name', 'description', 'location']
    ordering_fields = ['date', 'name']


class AttendeeViewSet(viewsets.ModelViewSet):
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['event', 'email']
    search_fields = ['name', 'email']
    ordering_fields = ['name', 'email']

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def assign_event(self, request, pk=None):
        attendee = self.get_object()
        event_id = request.data.get('event_id')
        try:
            event = Event.objects.get(pk=event_id)
            attendee.event = event
            attendee.save()
            return Response({'status': 'event assigned'}, status=status.HTTP_200_OK)
        except Event.DoesNotExist:
            return Response({'error': 'Event does not exist'}, status=status.HTTP_400_BAD_REQUEST)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['event', 'attendee', 'status']
    search_fields = ['name', 'description']
    ordering_fields = ['deadline', 'name', 'status']

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def mark_completed(self, request, pk=None):
        task = self.get_object()
        task.status = 'Completed'
        task.save()
        return Response({'status': 'task marked as completed'}, status=status.HTTP_200_OK)


# Custom Views for User Registration and Login
class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, password=password, email=email)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "message": "User registered successfully!"}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "message": "Login successful!"})
        return Response({"error": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)
