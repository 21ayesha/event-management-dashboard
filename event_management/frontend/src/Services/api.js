// frontend/src/services/api.js

import axios from 'axios';

// Set the base URL of the Django API
const API_URL = 'http://127.0.0.1:8000/api/'; // Make sure this is your backend URL

// Create an instance of axios
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ensure token is stored in localStorage upon login
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch events from the backend
export const fetchEvents = async () => {
  try {
    const response = await api.get('events/');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Fetch tasks for a specific event
export const fetchTasks = async (eventId) => {
  try {
    const response = await api.get(`tasks/?event=${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Fetch attendees for a specific event
export const fetchAttendees = async (eventId) => {
  try {
    const response = await api.get(`attendees/?event=${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendees:', error);
    throw error;
  }
};

// Add attendee
export const addAttendee = async (attendeeData) => {
  try {
    const response = await api.post('attendees/', attendeeData);
    return response.data;
  } catch (error) {
    console.error('Error adding attendee:', error);
    throw error;
  }
};

// Add task
export const addTask = async (taskData) => {
  try {
    const response = await api.post('tasks/', taskData);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Update task status
export const markTaskCompleted = async (taskId) => {
  try {
    const response = await api.post(`tasks/${taskId}/mark_completed/`);
    return response.data;
  } catch (error) {
    console.error('Error marking task as completed:', error);
    throw error;
  }
};

// Assign attendee to event
export const assignAttendeeToEvent = async (attendeeId, eventId) => {
  try {
    const response = await api.post(`attendees/${attendeeId}/assign_event/`, { event_id: eventId });
    return response.data;
  } catch (error) {
    console.error('Error assigning attendee to event:', error);
    throw error;
  }
};
