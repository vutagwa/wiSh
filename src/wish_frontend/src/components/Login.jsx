import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { createActor } from '../../../declarations/wish_backend';
import { useNavigate } from 'react-router-dom'; // For navigation
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [authClient, setAuthClient] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [principal, setPrincipal] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const initAuthClient = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);
        if (await client.isAuthenticated()) {
          const identity = client.getIdentity();
          const agent = new HttpAgent({ identity });
          const actor = createActor(process.env.REACT_APP_CANISTER_ID_WISH_BACKEND, { agent });
          setLoggedIn(true);
          navigate('/userDashboard'); // Redirect to UserDashboard on successful login
        }
      } catch (e) {
        console.error('Failed to initialize auth client', e);
      }
    };

    initAuthClient();
  }, [navigate]);

  const handleLogin = async () => {
    if (authClient) {
      try {
        await new Promise((resolve) => {
          authClient.login({
            identityProvider: process.env.REACT_APP_DFX_NETWORK === 'ic'
              ? 'https://identity.ic0.app'
              : `http://localhost:4943`,
            onSuccess: resolve,
          });
        });

        const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });
        const actor = createActor(process.env.REACT_APP_CANISTER_ID_WISH_BACKEND, { agent });
        setLoggedIn(true);
        navigate('/userDashboard'); // Redirect to UserDashboard on successful login
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  const handleLogout = async () => {
    if (authClient) {
      try {
        await authClient.logout();
        setLoggedIn(false);
        setPrincipal('');
        window.location.reload();
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Welcome</a>
      </nav>

      <div className="wrapper">
        {!loggedIn ? (
          <div id="not_loggedin" className="row">
            <div className="col-md-6">
              <h1>Welcome</h1>
              <button className="btn btn-outline-primary" onClick={handleLogin}>Log in</button>
            </div>
            <div className="col-md-6">
              <img src="" className="img-fluid" alt="Home" />
            </div>
          </div>
        ) : (
          <div id="loggedin" className="row">
            <div className="col-md-6">
              <h1>Yay !!</h1>
              <p>You have logged in successfully</p>
              <div id="principal">{principal && `Your principal is: ${principal}`}</div>
              <button className="btn btn-outline-info" onClick={() => { /* Implement handleWhoAmI */ }}>What is my principal</button>
              <button className="btn btn-outline-primary" onClick={handleLogout}>Log out</button>
            </div>
            <div className="col-md-6">
              <img src="success.png" className="img-fluid" alt="Success" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
