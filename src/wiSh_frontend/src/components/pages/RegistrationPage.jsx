import React, { useState } from 'react';
import { HttpAgent, Actor } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
//import { idlFactory } from '../../../declarations/UserManager';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user'); 
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        const client = await AuthClient.create();
        const agent = new HttpAgent({ identity: client.getIdentity() });
        const userManager = Actor.createActor(idlFactory, {
            agent,
            canisterId: 'uy3uz-syaaa-aaaab-qadka-cai'
        });

        try {
            const message = await userManager.register(username, role, passkey);
            alert(message);
        } catch (e) {
            setError('An error occurred during registration.');
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
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <input
                type="password"
                placeholder="Passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            {error && <div>{error}</div>}
        </div>
    );
};

export default RegistrationPage;
