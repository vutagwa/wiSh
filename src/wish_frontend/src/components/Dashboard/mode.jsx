import React, { useState, useEffect } from 'react';

const Mode = () => {
  const [selectedMode, setSelectedMode] = useState('Light');

  const handleChange = (e) => {
    setSelectedMode(e.target.value);
  };

  useEffect(() => {
    document.body.className = selectedMode.toLowerCase() + '-mode';
  }, [selectedMode]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Mode</h2>
      <div>
        <label>
          <input
            type="radio"
            name="mode"
            value="Light"
            checked={selectedMode === 'Light'}
            onChange={handleChange}
          />
          Light Mode
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="mode"
            value="Dark"
            checked={selectedMode === 'Dark'}
            onChange={handleChange}
          />
          Dark Mode
        </label>
      </div>
      <p>Current Mode: {selectedMode}</p>
    </div>
  );
};

export default Mode;
