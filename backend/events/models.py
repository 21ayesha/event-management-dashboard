from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=100)
    date = models.DateField()

class Attendee(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='attendees', null=True, blank=True)

class Task(models.Model):
    name = models.CharField(max_length=100)
    deadline = models.DateField()
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Completed', 'Completed')])
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='tasks')
    attendee = models.ForeignKey(Attendee, on_delete=models.SET_NULL, null=True, blank=True)

