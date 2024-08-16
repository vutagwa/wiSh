import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageContent = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/content')
      .then(response => setContents(response.data))
      .catch(error => console.error('Error fetching content:', error));
  }, []);

  return (
    <div>
      <h2>Manage Content</h2>
      <ul>
        {contents.map(content => (
          <li key={content.id}>
            <a href={content.url}>{content.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageContent;
