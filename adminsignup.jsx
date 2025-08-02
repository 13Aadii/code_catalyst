import React, { useState } from 'react';
import './admin.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5001/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        navigate('/admindashboard'); 
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={handleSignIn}>
        <h2>Register here!!</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"><Link to="/manage">Signup</Link></button>
      </form>
    </div>
  );
};

export default AdminLogin;
