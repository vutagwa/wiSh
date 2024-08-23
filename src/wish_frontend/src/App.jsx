import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingpage'
import Login from './components/Login';
import UserDashboard from './components/userDahboard';


const App = () => {
  return (
   /* <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
    </Router>*/
    <UserDashboard/>
  );
};

export default App;
