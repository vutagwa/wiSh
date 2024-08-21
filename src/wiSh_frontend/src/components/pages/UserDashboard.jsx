import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDonate, faUsers, faFileAlt, faCog, faLock } from '@fortawesome/free-solid-svg-icons';

import Home from './Home';
import CommunityHub from './communityHub';
import CaseReportingForm from './CaseReporting';
import DonationCampaigns from './DonationHub';
import Wallet from './wallet';
import SettingsPage from './settings';

const UserDashboard = () => {
  return (
    <Router>
      <div className="user-dashboard">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/Home">
                <FontAwesomeIcon icon={faHome} />
                <span className="link-text">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/DonationHub">
                <FontAwesomeIcon icon={faDonate} />
                <span className="link-text">Donation Hub</span>
              </Link>
            </li>
            <li>
              <Link to="/communityHub">
                <FontAwesomeIcon icon={faUsers} />
                <span className="link-text">Community Hub</span>
              </Link>
            </li>
            <li>
              <Link to="/CaseReporting">
                <FontAwesomeIcon icon={faFileAlt} />
                <span className="link-text">Case Reporting</span>
              </Link>
            </li>
            <li>
              <Link to="/Wallet">
                <FontAwesomeIcon icon={faDonate} />
                <span className="link-text">My wallet</span>
              </Link>
            </li>
          </ul>
          <ul className="bottom-links">
            <li>
              <Link to="/SettingsPage">
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
            <Route exact path="/Home" element={<Home />} />
            <Route path="/DonationHub" element={<DonationCampaigns />} />
            <Route path="/communityHub" element={<CommunityHub />} />
            <Route path="/CaseReporting" element={<CaseReportingForm />} />
            <Route path="/Wallet" element={<Wallet />} />
            <Route path="/SettingsPage" element={<SettingsPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default UserDashboard;
