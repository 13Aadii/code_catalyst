import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Ask from './components/Ask'; 
import Admin from './components/admin';
import Manage from './components/manage';
import AdminSignup from './components/adminsignup';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
