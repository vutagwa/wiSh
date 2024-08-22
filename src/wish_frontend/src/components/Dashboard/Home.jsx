import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Your Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/wallet">Wallet</Link></li>
          <li><Link to="/case-report">Report a Case</Link></li>
          <li><Link to="/community">Community Hub</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/mode">Mode</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
