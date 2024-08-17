import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import RegistrationPage from './components/pages/RegistrationPage';
import AdminDashboard from './components/pages/AdminDashboard';
import UserDashboard from './components/pages/UserDashboard';
import CommunityHub from './components/pages/communityHub';
import CaseReportingForm from './components/pages/CaseReporting';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/" element={<RegistrationPage />} />
            </Routes>
        </Router>
    );
}

export default App;
