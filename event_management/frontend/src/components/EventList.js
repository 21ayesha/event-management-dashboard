import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { fetchEvents, api } from '../Services/api';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', location: '', date: '' });

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getEvents();
  }, []);

  const handleAddEvent = async () => {
    try {
      await api.post('/events/', newEvent);
      setOpen(false);
      setNewEvent({ name: '', description: '', location: '', date: '' });
      const updatedEvents = await fetchEvents();
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await api.delete(`/events/${eventId}/`); // Make sure the endpoint is correct
      const updatedEvents = await fetchEvents(); // Fetch updated events
      setEvents(updatedEvents); // Update the events state
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h1>Event Management</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ marginBottom: '20px' }}>
        Add Event
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
          <TextField label="Description" fullWidth value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
          <TextField label="Location" fullWidth value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
          <TextField type="date" fullWidth value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddEvent} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {events.map((eventItem) => ( // Ensure eventItem is defined here
          <Card key={eventItem.id} style={{ width: '300px' }}>
            <CardContent>
              <Typography variant="h6">{eventItem.name}</Typography>
              <Typography variant="body2">{eventItem.description}</Typography>
              <Typography variant="body2">Location: {eventItem.location}</Typography>
              <Typography variant="body2">Date: {eventItem.date}</Typography>
              <Button color="secondary" onClick={() => handleDeleteEvent(eventItem.id)}>Delete</Button> {/* Use eventItem.id */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventList;