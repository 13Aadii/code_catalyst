import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './manage.css';

const Manage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(storedQuestions);

    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  const updateLocalStorage = (updatedQuestions) => {
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, status: newStatus } : q
    );
    updateLocalStorage(updated);
  };

  const handleDescriptionChange = (id, newDescription) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, description: newDescription } : q
    );
    updateLocalStorage(updated);
  };

  const handleAnswerChange = (id, newAnswer) => {
    const updated = questions.map(q =>
      q.id === id ? { ...q, answer: newAnswer, answered: true, status: 'Resolved' } : q
    );
    updateLocalStorage(updated);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="manage-container">
      <div className="theme-toggle">
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <h2>Manage Questions</h2>
      {questions.length === 0 ? (
        <p>No questions submitted.</p>
      ) : (
        questions.map((q) => (
          <div className="question-card" key={q.id}>
            <h3>{q.title}</h3>
            <textarea
              value={q.description}
              onChange={(e) => handleDescriptionChange(q.id, e.target.value)}
              className="description-box"
            />
            <p><strong>Tags:</strong> {q.tags.join(', ')}</p>
            <select
              value={q.status}
              onChange={(e) => handleStatusChange(q.id, e.target.value)}
              className="status-dropdown"
            >
              <option value="Active">Active</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <textarea
              placeholder="Write answer here..."
              value={q.answer || ''}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              className="answer-box"
            />
            {q.answered && <p className="answered-tag">✅ Answered</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default Manage;
