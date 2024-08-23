// UserDashboard.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Dashboard/Home';
import Wallet from './wallet';
import CaseReport from './caseReportForm';
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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/wallet" render={() => <Wallet user={user} />} />
          <Route path="/case-report" render={() => <CaseReport user={user} />} />
          <Route path="/community" component={CommunityHub} />
          <Route path="/settings" render={() => <Settings user={user} />} />
          <Route path="/mode" component={Mode} />
        </Switch>
      </div>
    </Router>
  );
};

export default UserDashboard;
