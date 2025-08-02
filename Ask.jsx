// Ask.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ask.css';

const Ask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      const existingQuestions = JSON.parse(localStorage.getItem('questions')) || [];

      const newQuestion = {
        id: Date.now(),
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        status: 'Active',
        answered: false,
      };

      localStorage.setItem('questions', JSON.stringify([newQuestion, ...existingQuestions]));
      setSubmitted(true);

      // Clear form
      setTitle('');
      setDescription('');
      setTags('');
    }
  };

  return (
    <div className="ask-page">
      <div className="ask-box">
        <h2>Ask a Question</h2>

        <input
          type="text"
          placeholder="Question Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSubmitted(false);
          }}
        />

        <textarea
          placeholder="Question Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setSubmitted(false);
          }}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
            setSubmitted(false);
          }}
        />

        <div className="button-group">
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        </div>

        {submitted && (
          <div className="submitted-msg">
            <strong>Submitted!</strong> Your question was added.
          </div>
        )}
      </div>
    </div>
  );
};

export default Ask;
