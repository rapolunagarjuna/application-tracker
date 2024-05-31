import React, { useState } from 'react';
import './App.css';
import ApplicationForm from './ApplicationForm';
import ApplicationTable from './ApplicationTable';

function App() {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const addApplication = (application) => {
    setApplications([...applications, application]);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Job Applications</h1>
      <button onClick={() => setShowForm(true)}>Add Application</button>
      <input
        type="text"
        placeholder="Search applications"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ApplicationTable applications={filteredApplications} />
      {showForm && (
        <ApplicationForm
          addApplication={addApplication}
          closeForm={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
