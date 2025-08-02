// signin.jsx
import React from 'react';
import './signup.css';
import ThreeDModel from './ThreeDModel';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // After successful login
    navigate('/dashboard');
  };

  return (
    <div className="signin-wrapper">
      <div className="left-side">
        <ThreeDModel />
      </div>

      <div className="right-side">
        <h2>Already have an account?</h2>
        <p className="login-text"><a href='./signin.jsx'>Login here!</a></p>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="name-row">
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
          </div>

          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Enter your password" required />

          <div className="checkbox-row">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms & Conditions</a>
            </label>
          </div>

          <button type="submit">Register</button>

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
