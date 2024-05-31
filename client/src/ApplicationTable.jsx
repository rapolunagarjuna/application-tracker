import React from 'react';

function ApplicationTable({ applications }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Resume</th>
          <th>Job Description</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app, index) => (
          <tr key={index}>
            <td>{app.name}</td>
            <td>{app.resume ? app.resume.name : 'No file uploaded'}</td>
            <td>{app.jobDescription ? app.jobDescription.name : 'No file uploaded'}</td>
            <td>{app.date}</td>
            <td>{app.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApplicationTable;
