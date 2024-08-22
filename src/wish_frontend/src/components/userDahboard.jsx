import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Wallet from './components/Wallet';
import CaseReport from './components/CaseReport';
import CommunityHub from './components/CommunityHub';
import Settings from './components/Settings';
import Mode from './components/Mode';

const UserDashboard = () => {
  const user = 'exampleUser';

  return (
    <Router>
      <div>
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
