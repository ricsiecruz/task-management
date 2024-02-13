import React from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from './TaskForm';

const EditTask = ({ currentUser, tasks, onUpdateTask }) => {
  const { taskId } = useParams();
  // Find the task with the specified taskId
  const taskToEdit = tasks.find(task => task.id === taskId);

  return (
    <TaskForm currentUser={currentUser} task={taskToEdit} onUpdateTask={onUpdateTask} />
  );
};

export default EditTask;