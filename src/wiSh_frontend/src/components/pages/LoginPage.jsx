import React, { useState } from 'react';
import { HttpAgent, Actor } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
//import { idlFactory } from '../../../declarations/UserManager';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');
    const [authClient, setAuthClient] = useState(null);

    const initializeAuthClient = async () => {
        const client = await AuthClient.create();
        setAuthClient(client);
    };

    const handleLogin = async () => {
        if (!authClient) {
            await initializeAuthClient();
        }
        const agent = new HttpAgent({ identity: authClient.getIdentity() });
        const userManager = Actor.createActor(idlFactory, {
            agent,
            canisterId: 'uy3uz-syaaa-aaaab-qadka-cai'
        });

        try {
            const role = await userManager.login(username, passkey);
            if (role === 'admin') {
                window.location.href = '/admin-dashboard';
            } else if (role === 'user') {
                window.location.href = '/user-dashboard';
            } else {
                setError('Invalid login credentials.');
            }
        } catch (e) {
            setError('An error occurred during login.');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <div>{error}</div>}
        </div>
    );
};

export default LoginPage;
