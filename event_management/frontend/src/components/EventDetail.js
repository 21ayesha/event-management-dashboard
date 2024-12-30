// src/components/EventDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTasks } from '../Services/api';

const EventDetail = () => {
  const { eventId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks(eventId);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    getTasks();
  }, [eventId]);

  return (
    <div>
      <h2>Tasks for Event {eventId}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetail;
