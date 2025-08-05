import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div style={{
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px 20px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
}}>
  <h1 style={{ textAlign: 'center', color: '#E65100' }}>Todo Task Manager</h1>
  <TaskForm onAdd={() => window.location.reload()} />
  <TaskList />
</div>

  );
}


export default App;
