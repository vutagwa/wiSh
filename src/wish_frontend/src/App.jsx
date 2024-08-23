import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingpage';
import Login from './components/Login';
import UserDashboard from './components/userDashboard';

const App = () => {
  return (
    /*<Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
      </Routes>
    </Router>*/  <UserDashboard/>
  );
};

export default App;
