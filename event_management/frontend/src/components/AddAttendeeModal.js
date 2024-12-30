import React, { useState } from 'react';
import { Modal, Button, TextField, Typography } from '@mui/material';
import { api } from '../Services/api';

const AddAttendeeModal = ({ open, handleClose, fetchAttendees, eventId }) => { // Pass eventId as a prop
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddAttendee = async () => {
    try {
      await api.post('attendees/', { name, email, event: eventId }); // Include the event ID
      fetchAttendees(); // Refresh the attendee list
      handleClose(); // Close the modal
    } catch (error) {
      console.error('Error adding attendee:', error.response.data); // Log the error response
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ padding: '20px', backgroundColor: 'white', margin: 'auto', marginTop: '100px', width: '300px' }}>
        <Typography variant="h6">Add Attendee</Typography>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button onClick={handleAddAttendee} color="primary">Add</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default AddAttendeeModal;