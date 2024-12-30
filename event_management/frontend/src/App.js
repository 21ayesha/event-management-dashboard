import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList'; 
import EventDetail from './components/EventDetail';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/navbar';
import AttendeeList from './components/AttendeeList'; 
import TaskTracker from './components/TaskTracker'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} /> // Set Register as the default page
        <Route path="/events" element={<EventList />} /> // Route for EventList
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/attendees" element={<AttendeeList />} /> 
        <Route path="/tasks" element={<TaskTracker />} /> 
      </Routes>
    </Router>
  );
};

export default App;