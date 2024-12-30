import React, { useEffect, useState } from 'react';
import { api } from '../Services/api';
import { Button, Typography, List, ListItem } from '@mui/material';
import AddAttendeeModal from './AddAttendeeModal'; // Import your modal component

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchAttendees = async () => {
    const response = await api.get('attendees/');
    setAttendees(response.data);
  };

  const handleDeleteAttendee = async (attendeeId) => {
    try {
      await api.delete(`/attendees/${attendeeId}/`);
      fetchAttendees(); // Refresh the attendee list
    } catch (error) {
      console.error('Error deleting attendee:', error);
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  return (
    <div>
      <Button onClick={() => setOpenModal(true)}>Add Attendee</Button>
      <AddAttendeeModal open={openModal} handleClose={() => setOpenModal(false)} fetchAttendees={fetchAttendees} />
      <List>
        {attendees.map((attendee) => (
          <ListItem key={attendee.id}>
            <Typography>{attendee.name} - {attendee.email}</Typography>
            <Button onClick={() => handleDeleteAttendee(attendee.id)} color="secondary">Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AttendeeList;