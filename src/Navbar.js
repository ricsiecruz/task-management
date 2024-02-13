import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ currentUser, onLogout }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Your Logo</Link>
        <button className="navbar-toggler" type="button" onClick={handleToggleCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`} to="/tasks">Tasks</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/new-task' ? 'active' : ''}`} to="/new-task">New Task</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {currentUser ? (
              <li className="nav-item">
                <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`} to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
