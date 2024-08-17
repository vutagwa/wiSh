import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faFileAlt, faFolder, faCalendar, faCog, faLock } from '@fortawesome/free-solid-svg-icons';

import Home from './admin/Home';
import ManageUsers from './admin/ManageUsers';
import ManageContent from './admin/ManageContent';
import ManageCases from './admin/ManageCases';
import ManageEvents from './admin/ManageEvents';

const AdminDashboard = () => {
  return (
    <Router>
      <div className="admin-dashboard">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/admin/home">
                <FontAwesomeIcon icon={faHome} />
                <span className="link-text">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manageUsers">
                <FontAwesomeIcon icon={faUsers} />
                <span className="link-text">Manage Users</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manageContent">
                <FontAwesomeIcon icon={faFileAlt} />
                <span className="link-text">Manage Content</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manageCases">
                <FontAwesomeIcon icon={faFolder} />
                <span className="link-text">Manage Cases</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manageEvents">
                <FontAwesomeIcon icon={faCalendar} />
                <span className="link-text">Manage Events</span>
              </Link>
            </li>
          </ul>
          <ul className="bottom-links">
            <li>
              <Link to="/admin/settings">
                <FontAwesomeIcon icon={faCog} />
                <span className="link-text">Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/privacy">
                <FontAwesomeIcon icon={faLock} />
                <span className="link-text">Privacy</span>
              </Link>
            </li>
          </ul>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/admin/home" element={<Home />} />
            <Route path="/admin/manageUsers" element={<ManageUsers />} />
            <Route path="/admin/manageContent" element={<ManageContent />} />
            <Route path="/admin/manageCases" element={<ManageCases />} />
            <Route path="/admin/manageEvents" element={<ManageEvents />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AdminDashboard;
