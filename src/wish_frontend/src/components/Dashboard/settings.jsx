import React, { useState } from 'react';

const Settings = ({ user }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
  });

  const [profilePic, setProfilePic] = useState(user.profilePic || ''); 

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.checked,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/') && file.size <= 2 * 1024 * 1024) { 
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePic(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image file smaller than 2MB.');
      }
    }
  };

  const handleSave = () => {
    // Save settings logic
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
      <div>
        <h3>Profile Picture</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {profilePic && (
          <div style={{ marginTop: '10px' }}>
            <img
              src={profilePic}
              alt="Profile Preview"
              style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
        )}
      </div>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default Settings;
