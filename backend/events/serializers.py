
from rest_framework import serializers
from .models import Event, Attendee, Task


class AttendeeSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())

    class Meta:
        model = Attendee
        fields = '__all__'
 

class TaskSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    attendee = serializers.PrimaryKeyRelatedField(queryset=Attendee.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Task
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    attendees = AttendeeSerializer(many=True, read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = '__all__'
