
import React, { useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

// Replace with your actual canister ID
const webappId = 'your-webapp-canister-id';

const webappIdl = ({ IDL }) => {
  return IDL.Service({
    whoami: IDL.Func([], [IDL.Principal], ['query']),
  });
};

const Login = () => {
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const authClient = await AuthClient.create();
      const iiUrl = 'https://identity.ic0.app'; // Adjust based on your network

      await new Promise((resolve, reject) => {
        authClient.login({
          identityProvider: iiUrl,
          onSuccess: resolve,
          onError: reject,
        });
      });

      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });
      const webapp = Actor.createActor(webappIdl, {
        agent,
        canisterId: webappId,
      });
      const principalId = await webapp.whoami();
      setPrincipal(principalId.toText());
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login with Internet Identity'}
      </button>
      {principal && <p>Logged in as: {principal}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
