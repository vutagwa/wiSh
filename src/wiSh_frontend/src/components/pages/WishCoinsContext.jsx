import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchWishCoinsFromBackend } from '../../dfx_generates/api';

const WishCoinsContext = createContext();

export const WishCoinsProvider = ({ children }) => {
    const [wishCoins, setWishCoins] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);

    useEffect(() => {
        const fetchWishCoins = async () => {
            const coins = await fetchWishCoinsFromBackend();
            setWishCoins(coins);
        };
        fetchWishCoins();
    }, []);

    const updateWishCoins = async () => {
        const coins = await fetchWishCoinsFromBackend();
        setWishCoins(coins);
    };

    const addTransaction = (transaction) => {
        setTransactionHistory([...transactionHistory, transaction]);
    };

    return (
        <WishCoinsContext.Provider value={{ wishCoins, transactionHistory, updateWishCoins, addTransaction }}>
            {children}
        </WishCoinsContext.Provider>
    );
};

export const useWishCoins = () => useContext(WishCoinsContext);
