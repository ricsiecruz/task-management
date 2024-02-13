import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TaskForm = ({ onCreateTask, onUpdateTask, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // State to hold the image file
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview URL
  const [subTasks, setSubTasks] = useState([]); // State to hold the list of sub-tasks
  const [subTaskTitle, setSubTaskTitle] = useState(''); // State to hold the title of the new sub-task
  const [status, setStatus] = useState('Todo'); // State to hold the task status
  const [subTaskStatus, setSubTaskStatus] = useState('Todo'); // State to hold the status of sub-tasks
  const { taskId } = useParams();

  useEffect(() => {
    // Populate the form fields with task details if task prop is provided
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
      // Set the image state with the existing image file
      if (task.image) {
        setImage(task.image);
        setImagePreview(URL.createObjectURL(task.image));
      }
      // Set the sub-tasks state with the existing sub-tasks
      if (task.subTasks) {
        setSubTasks(task.subTasks);
      }
    }
  }, [task]);

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, image, subTasks, status }; // Include status in the new task data
    if (task) {
      // If task prop is provided, it means we're updating an existing task
      onUpdateTask({ ...task, ...newTask });
    } else {
      // If task prop is not provided, it means we're creating a new task
      onCreateTask(newTask);
    }
    setTitle('');
    setImage(null); // Reset image state after submission
    setImagePreview(null); // Reset image preview state after submission
    setSubTasks([]); // Reset sub-tasks state after submission
    setSubTaskTitle(''); // Reset sub-task title state after submission
    setStatus('Todo'); // Reset status state after submission
    setSubTaskStatus('Todo'); // Reset sub-task status state after submission
    // You can redirect programmatically here using window.location or other methods if needed
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // Read the selected image file and set the image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubTask = () => {
    if (subTaskTitle.trim() !== '') {
      setSubTasks([...subTasks, { title: subTaskTitle, status: subTaskStatus }]);
      setSubTaskTitle(''); // Clear the sub-task title input field after adding
      setSubTaskStatus('Todo'); // Reset the sub-task status after adding
    }
  };

  const handleSubTaskChange = (e, index) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index].title = e.target.value;
    setSubTasks(updatedSubTasks);
  };

  const handleSubTaskStatusChange = (e, index) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index].status = e.target.value;
    setSubTasks(updatedSubTasks);
  };

  const handleDeleteSubTask = (index) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks.splice(index, 1);
    setSubTasks(updatedSubTasks);
  };

  return (
    <div className="container">
      <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleTaskSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        
        {/* Add dropdown for status selection */}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status:</label>
          <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} />
          {/* Display image preview if available */}
          {imagePreview && (
            <img src={imagePreview} alt="Task Preview" style={{ maxWidth: '100%', width: '100px', marginTop: '10px' }} />
          )}
        </div>
        {/* Add sub-task input fields */}
        <div className="mb-3">
          <h3>Sub-Tasks</h3>
          {subTasks.map((subTask, index) => (
            <div className="mb-2" key={index}>
              <input type="text" className="form-control" value={subTask.title} onChange={(e) => handleSubTaskChange(e, index)} />
              {/* Add dropdown for sub-task status */}
              <select className="form-select mt-1" value={subTask.status} onChange={(e) => handleSubTaskStatusChange(e, index)}>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button type="button" className="btn btn-danger mt-1" onClick={() => handleDeleteSubTask(index)}>Delete</button>
            </div>
          ))}
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Add Sub-Task" value={subTaskTitle} onChange={(e) => setSubTaskTitle(e.target.value)} />
            {/* Add dropdown for sub-task status */}
            <select className="form-select mt-1" value={subTaskStatus} onChange={(e) => setSubTaskStatus(e.target.value)}>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button type="button" className="btn btn-primary mt-1" onClick={handleAddSubTask}>Add Sub-Task</button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">{task ? 'Update Task' : 'Create Task'}</button>
      </form>
    </div>
  );
};

export default TaskForm;
