import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Dashboard/Home';
import Wallet from './wallet';
import CaseReportForm from './caseReportForm';
import CommunityHub from './communityHub';
import Settings from './Dashboard/settings';
import Mode from './Dashboard/mode';
import Sidebar from './Dashboard/sidebar';

const UserDashboard = () => {
  const user = 'exampleUser';

  return (
    <Router>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet user={user} />} />
          <Route path="/case-report" element={<CaseReportForm user={user} />} />
          <Route path="/community" element={<CommunityHub />} />
          <Route path="/settings" element={<Settings user={user} />} />
          <Route path="/mode" element={<Mode />} />
        </Routes>
      </div>
    </Router>
  );
};

export default UserDashboard;
