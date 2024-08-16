// WishCoinsContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory, canisterId } from '../../dfx_generates/report_case';

// Initialize the HttpAgent
const agent = new HttpAgent();
let reportCaseActor;
try {
    reportCaseActor = Actor.createActor(idlFactory, { agent, canisterId });
} catch (err) {
    console.error('Error creating actor:', err);
}

const WishCoinsContext = createContext();

export const WishCoinsProvider = ({ children }) => {
    const [wishCoins, setWishCoins] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const balance = await reportCaseActor.getWishCoinsBalance();
                const history = await reportCaseActor.getTransactionHistory();
                setWishCoins(balance);
                setTransactionHistory(history);
            } catch (err) {
                console.error('Failed to fetch initial data:', err);
            }
        };
        fetchInitialData();
    }, []);

    const updateWishCoins = async () => {
        try {
            const balance = await reportCaseActor.getWishCoinsBalance();
            setWishCoins(balance);
        } catch (err) {
            console.error('Failed to update Wish Coins:', err);
        }
    };

    const addTransaction = (transaction) => {
        setTransactionHistory((prevHistory) => [...prevHistory, transaction]);
    };

    return (
        <WishCoinsContext.Provider value={{ wishCoins, transactionHistory, updateWishCoins, addTransaction }}>
            {children}
        </WishCoinsContext.Provider>
    );
};

export const useWishCoins = () => useContext(WishCoinsContext);
