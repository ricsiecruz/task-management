import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Instead of useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call backend API to authenticate user with email and password
    // If authentication succeeds, call onLogin callback and navigate to tasks page
    const user = { email }; // Example user data
    onLogin(user);
    navigate('/tasks'); // Instead of history.push('/tasks')
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
