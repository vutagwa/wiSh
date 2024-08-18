import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'English',
    profilePicture: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:5000/settings');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 180 * 180 * 4) { // 4 bytes per pixel
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prevSettings => ({
          ...prevSettings,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
      setFile(file);
    } else {
      alert('Please upload an image of size up to 180x180 pixels.');
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('settings', JSON.stringify(settings));
      if (file) {
        formData.append('profilePicture', file);
      }

      const response = await fetch('http://localhost:5000/settings', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Settings saved:', data);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="settings-page">
      <div className="sidebar">
        <h5 className="sidebar-title">Profile Settings</h5>
        <ul className="sidebar-nav">
          <li className="nav-item">
            <a href="#account" className="nav-link active">Account</a>
          </li>
          <li className="nav-item">
            <a href="/password" className="nav-link">Password</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Privacy and safety</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Email notifications</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Web notifications</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Widgets</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Your data</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Delete account</a>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="tab-content">
          <div className="tab-pane fade show active" id="account" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Public info</h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="inputUsername">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputUsername"
                          name="username"
                          placeholder="Username"
                          value={settings.username || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputBio">Biography</label>
                        <textarea
                          rows="2"
                          className="form-control"
                          id="inputBio"
                          name="bio"
                          placeholder="Tell something about yourself"
                          value={settings.bio || ''}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center">
                        <img
                          alt="User"
                          src={settings.profilePicture || 'https://bootdey.com/img/Content/avatar/avatar1.png'}
                          className="rounded-circle img-responsive mt-2"
                          width="128"
                          height="128"
                        />
                        <div className="mt-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </div>
                        <small>For best results, use an image of size 180x180 pixels or less.</small>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
