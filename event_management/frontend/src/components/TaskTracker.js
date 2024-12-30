import React, { useState } from "react";

const TaskTracker = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Setup Venue", completed: false, eventId: 1 },
    { id: 2, title: "Send Invitations", completed: true, eventId: 1 },
    { id: 3, title: "Prepare Materials", completed: false, eventId: 2 },
    { id: 4, title: "Book Speakers", completed: false, eventId: 2 },
  ]);
  const [selectedEvent, setSelectedEvent] = useState("");

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const progress =
    (tasks.filter((task) => task.completed).length / tasks.length) * 100;

  // Filter tasks based on the selected event
  const filteredTasks = selectedEvent
    ? tasks.filter((task) => task.eventId === parseInt(selectedEvent))
    : tasks;

  return (
    <div className="container">
      <h2>Task Tracker</h2>

      {/* Event Selector */}
      <div>
        <label>Select Event</label>
        <select onChange={(e) => setSelectedEvent(e.target.value)}>
          <option value="">Select Event</option>
          <option value="1">Birthday</option>
          <option value="2">Engagement</option>
        </select>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <label>{task.title}</label>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <label>{progress.toFixed(0)}% Completed</label>
        <div
          style={{
            width: "50%",
            backgroundColor: "#ccc",
            height: "10px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              backgroundColor: "blue",
              height: "100%",
              borderRadius: "5px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;