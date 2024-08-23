import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { createActor, wish_backend } from '../../../declarations/wish_backend';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [authClient, setAuthClient] = useState(null);
  const [actor, setActor] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [principal, setPrincipal] = useState('');

  useEffect(() => {
    const initAuthClient = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);
        if (await client.isAuthenticated()) {
          const identity = client.getIdentity();
          const agent = new HttpAgent({ identity });
          const actor = createActor(process.env.REACT_APP_CANISTER_ID_WISH_BACKEND, { agent });
          setActor(actor);
          setLoggedIn(true);
        }
      } catch (e) {
        console.error('Failed to initialize auth client', e);
        setActor(wish_backend);
        setLoggedIn(false);
      }
    };

    initAuthClient();
  }, []);

  const handleLogin = async () => {
    if (authClient) {
      await new Promise((resolve) => {
        authClient.login({
          identityProvider: process.env.REACT_APP_DFX_NETWORK === 'ic'
            ? 'https://identity.ic0.app'
            : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
          onSuccess: resolve,
        });
      });

      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });
      const actor = createActor(process.env.REACT_APP_CANISTER_ID_WISH_BACKEND, { agent });
      setActor(actor);
      setLoggedIn(true);
    }
  };

  const handleWhoAmI = async () => {
    if (actor) {
      try {
        const principal = await actor.whoami();
        setPrincipal(principal.toString());
      } catch (e) {
        console.error('Failed to get principal', e);
      }
    }
  };

  const handleLogout = async () => {
    if (authClient) {
      await authClient.logout();
      setLoggedIn(false);
      setPrincipal('');
      window.location.reload();
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Welcome</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="wrapper">
        {!loggedIn ? (
          <div id="not_loggedin" className="row">
            <div className="col-md-6">
              <div className="feature-box">
                <h1>Welcome</h1>
                <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi obcaecati porro quibusdam? Beatae amet in distinctio omnis libero dolore enim quidem minima. Aperiam, modi provident cumque sapiente numquam voluptatibus illum!
                </p>
                <button className="btn btn-outline-primary" onClick={handleLogin}>Log in</button>
              </div>
            </div>
            <div className="col-md-6">
              <img src="home-img.png" className="img-fluid" alt="Home" />
            </div>
          </div>
        ) : (
          <div id="loggedin" className="row">
            <div className="col-md-6">
              <div className="feature-box">
                <h1>Yay !!</h1>
                <p>You have logged in successfully</p>
                <div id="principal">{principal && `Your principal is: ${principal}`}</div>
                <button id="whoAmI" className="btn btn-outline-info" onClick={handleWhoAmI}>What is my principal</button>
                <button id="logout" className="btn btn-outline-primary" onClick={handleLogout}>Log out</button>
              </div>
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
