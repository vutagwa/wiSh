import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar">
    <Link to="/">Home</Link>
    <Link to="/wallet">Wallet</Link>
    <Link to="/case-report">Case Report</Link>
    <Link to="/community">Community Hub</Link>
    <Link to="/campaigns">Donation Hub</Link>
    <Link to="/settings">Settings</Link>
    <Link to="/mode">Mode</Link>
  </div>
);

export default Sidebar;
