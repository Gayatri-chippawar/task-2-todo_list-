import './TaskList.css'; 
import CommentSection from './CommentSection';
import React, { useEffect, useState } from 'react';
import api from '../api';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks/');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-container">
      <h2>Task List</h2>
      <ul>
        {tasks.map((t) => (
          <li className="task-item" key={t.id}>
            <div className="task-header">
  <div className="task-title">{t.name}</div>
  <button
    className="task-delete-btn"
    onClick={() => deleteTask(t.id)}
  >
    Delete
  </button>
</div>

            <div className="comments">
              <CommentSection taskId={t.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
