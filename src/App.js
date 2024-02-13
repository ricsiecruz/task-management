// App.js
import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import EditTask from './EditTask';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    // Save user data to localStorage or session storage
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // Clear user data from localStorage or session storage
  };

  const handleCreateTask = (newTask) => {
    // Generate a unique id for the new task
    const id = Math.random().toString(36).substr(2, 9);
    // Add the current date as the creation date
    const createdAt = new Date().toISOString();
    // Add a default status of "Todo" to new tasks
    const taskWithStatus = { ...newTask, status: 'Todo', id, createdAt };
    // Update the tasks state using the functional form of setTasks
    setTasks(prevTasks => [...prevTasks, taskWithStatus]);
    console.log('Updated tasks:', tasks); // Log the updated tasks array
  };
  

  const handleUpdateTask = (updatedTask) => {
    // Find the index of the task to update
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      // Create a new tasks array with the updated task at the appropriate index
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      // Update the tasks state
      setTasks(updatedTasks);
    }
  };

  const handleDeleteTask = (taskId) => {
    // Filter out the task with the specified taskId
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    // Update the tasks state
    setTasks(updatedTasks);
  };

  return (
    <Router>
      <Fragment>
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route exact path="/tasks" element={<TaskList currentUser={currentUser} onLogout={handleLogout} tasks={tasks} onDeleteTask={handleDeleteTask} />} />
          {/* Pass the onCreateTask and onUpdateTask functions to the TaskForm component */}
          <Route exact path="/new-task" element={<TaskForm currentUser={currentUser} onCreateTask={handleCreateTask} />} />
          {/* Route for editing a task */}
          <Route exact path="/edit-task/:taskId" element={<EditTask currentUser={currentUser} tasks={tasks} onUpdateTask={handleUpdateTask} />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
