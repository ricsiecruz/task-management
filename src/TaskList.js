import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TaskList({ currentUser, onLogout, tasks }) {
  const [sortBy, setSortBy] = useState('createdAt'); // Default sorting by createdAt
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is ascending
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleToggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const sortedTasks = tasks.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    let comparison = 0;
    if (sortBy === 'createdAt') {
      comparison = dateA - dateB;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const filteredTasks = sortedTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery) || // Search main task titles
    (task.subTasks && task.subTasks.some(subTask => subTask.title.toLowerCase().includes(searchQuery))) // Search sub-task titles
  );

  return (
    <div className="container">
      <h1>Task List</h1>
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.email}!</p>
          <div className="d-flex justify-content-between align-items-center my-3">
            <div>
              <button className="btn btn-primary" onClick={handleToggleSortOrder}>Sort by date</button>
            </div>
            <div className="input-group w-50">
              <input type="text" className="form-control" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
            </div>
          </div>
          <ul className="list-group">
            {filteredTasks.map((task, index) => (
              <li className="list-group-item" key={index}>
                <h3>{task.title}</h3>
                <p>Status: {task.status}</p>
                <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
                {/* Display the image file name if available */}
                {task.image && <p>Image: {task.image.name}</p>}
                {/* Display sub-tasks if available */}
                {task.subTasks && (
                  <ul className="list-group mt-3">
                    {task.subTasks.map((subTask, subIndex) => (
                      <li className="list-group-item" key={subIndex}>
                        <p>{subTask.title}</p>
                        <p>Status: {subTask.status}</p>
                      </li>
                    ))}
                  </ul>
                )}
                <Link className="btn btn-primary" to={`/edit-task/${task.id}`}>Edit</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please log in to view tasks.</p>
      )}
    </div>
  );
}

export default TaskList;
