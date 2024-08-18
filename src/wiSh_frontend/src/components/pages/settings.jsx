// src/SettingsPage.js
import React, { useState } from 'react';

const SettingsPage = () => {
  // Initialize state for settings
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'English'
  });

  // Handle change in settings
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Save settings function (to be implemented)
  const handleSave = () => {
    // Example: save settings to local storage or API
    console.log('Settings saved:', settings);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form>
        <div>
          <label>
            Theme:
            <select name="theme" value={settings.theme} onChange={handleChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>

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
            Language:
            <select name="language" value={settings.language} onChange={handleChange}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </label>
        </div>

        <button type="button" onClick={handleSave}>Save Settings</button>
      </form>
    </div>
  );
};

export default SettingsPage;
