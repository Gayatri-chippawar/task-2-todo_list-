import React, { useState } from 'react';
import api from '../api';
import './TaskForm.css';  

function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks/', {
        name: taskName,
      });
      console.log("Added:", res.data);
      setTaskName('');
      onAdd();
    } catch (error) {
      console.error("POST error:", error.message);
      alert("Failed to add task. Check console.");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
