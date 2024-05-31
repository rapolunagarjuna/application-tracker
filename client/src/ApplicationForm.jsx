import React, { useState } from 'react';

const BACKEND_URL = "http://localhost:3000"

export default function ApplicationForm({ addApplication, closeForm }) {
  const [name, setName] = useState('');
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch(BACKEND_URL + "/application", {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      addApplication(result);

      closeForm();
    } catch (error) {
      
      console.error('There was a problem with the fetch operation:', error);
    }

  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeForm}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            Application Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Resume:
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </label>
          <label>
            Job Description:
            <input
              type="file"
              onChange={(e) => setJobDescription(e.target.files[0])}
              required
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={closeForm}>Close</button>
        </form>
      </div>
    </div>
  );
}
