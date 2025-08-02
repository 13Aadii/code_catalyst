import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [theme, setTheme] = useState('light');
  const [status, setStatus] = useState('Available');
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('questions')) || [];
    setSubmittedQuestions(stored);
  }, []);

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme === 'dark' ? 'dark-theme' : 'light-theme';
  };

  const handleAskClick = () => {
    navigate('/ask');
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to settings > account > reset password.",
    },
    {
      question: "Where can I check IPO listings?",
      answer: "Visit the IPO section from the navigation bar.",
    },
    {
      question: "How to contact support?",
      answer: "Use the contact form at the bottom of the page.",
    },
    {
        question: "How to contact support?",
        answer: "Use the contact form at the bottom of the page.",
      },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubmitted = submittedQuestions.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`dashboard-container ${theme}`}>
      <div className="top-controls">
        <button onClick={handleThemeToggle} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <select
          className="status-dropdown"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Available">Active</option>
          <option value="Busy">Inactive</option>
          <option value="Offline">Neutral</option>
        </select>
      </div>

      <h2>Dashboard</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="ask-button" onClick={handleAskClick}>Ask</button>
      </div>

      <div className="faq-section">
        <h3>Submitted Questions</h3>
        {filteredSubmitted.length > 0 ? (
          filteredSubmitted.map((q, idx) => (
            <div className="faq-item submitted" key={q.id}>
              <div className="faq-question" onClick={() => toggleAnswer(`submitted-${idx}`)}>
                ❓ {q.title}
                <span className="toggle-icon">{expandedIndex === `submitted-${idx}` ? '−' : '+'}</span>
              </div>
              {expandedIndex === `submitted-${idx}` && (
                <div className="faq-answer">
                  <p><strong>📝 Description:</strong> {q.description}</p>
                  <p><strong>🏷️ Tags:</strong> {q.tags.join(', ')}</p>
                  <p><strong>📌 Status:</strong> {q.status}</p>
                  <p><strong>✅ Answered:</strong> {q.answered ? 'Yes' : 'No'}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">No submitted questions.</p>
        )}
      </div>

      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => (
            <div className="faq-item" key={idx}>
              <div className="faq-question" onClick={() => toggleAnswer(`faq-${idx}`)}>
                ❓ {faq.question}
                <span className="toggle-icon">{expandedIndex === `faq-${idx}` ? '−' : '+'}</span>
              </div>
              {expandedIndex === `faq-${idx}` && (
                <p className="faq-answer">💬 {faq.answer}</p>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">No FAQs match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
