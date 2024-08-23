import React, { useState } from 'react';

const Settings = ({ user }) => {
  const [settings, setSettings] = useState({
    // Placeholder for actual settings
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSave = () => {
    // to do save functionality
    alert('Settings saved!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Settings</h2>
      <div>
        <label>
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
          Enable Notifications
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />
          Dark Mode
        </label>
      </div>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default Settings;
