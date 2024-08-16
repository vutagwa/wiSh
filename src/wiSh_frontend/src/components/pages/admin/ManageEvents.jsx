import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h2>Manage Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong>: {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEvents;
