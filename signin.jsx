// signin.jsx
import React, { useState } from 'react';
import './signin.css';
import ThreeDModel from './ThreeDModel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });
  
      console.log("Login successful", response.data);
  
      if (response.data.success) {
        // Store token or navigate
        navigate("/admin/dashboard"); // Change route as needed
      } else {
        alert("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error during login");
    }
  };
  

  const goToSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div className="signin-wrapper">
      <div className="left-side">
        <ThreeDModel />
      </div>

      <div className="right-side">
        <h2>Login Here!!</h2>
        <p className="login-text">Write credentials below!</p>

        {error && <p className="error-msg">{error}</p>}

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="name-row">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="checkbox-row">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms & Conditions</a>
            </label>
          </div>

          <button type="submit">Login</button>
          <button onClick={goToSignup} type="submit">Signup</button>

          <div className="divider">Or register with</div>
          <div className="social-buttons">
            <button type="button" className="google-btn">Google</button>
            <button type="button" className="apple-btn">Apple</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
