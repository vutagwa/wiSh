import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from './components/pages/UserDashboard';
import AdminDashboard from './components/pages/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<UserDashboard />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
