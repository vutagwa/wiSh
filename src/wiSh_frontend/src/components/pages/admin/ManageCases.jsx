import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCases = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cases')
      .then(response => setCases(response.data))
      .catch(error => console.error('Error fetching cases:', error));
  }, []);

  return (
    <div>
      <h2>Manage Cases</h2>
      <ul>
        {cases.map(caseItem => (
          <li key={caseItem.id}>
            <strong>{caseItem.incidentType}</strong>: {caseItem.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCases;
