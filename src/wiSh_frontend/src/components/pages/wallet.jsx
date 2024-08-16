import React, { useState, useEffect } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory, canisterId } from '../../dfx_generates/report_case';

// Function to initialize the actor
const createActor = () => {
  try {
    const agent = new HttpAgent();
    return Actor.createActor(idlFactory, { agent, canisterId });
  } catch (error) {
    console.error('Error creating actor:', error);
    return null;
  }
};

const Wallet = () => {
  const [wishCoins, setWishCoins] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [reportCaseActor, setReportCaseActor] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState(0);
  const [donateAmount, setDonateAmount] = useState(0);

  useEffect(() => {
    const actor = createActor();
    setReportCaseActor(actor);
    if (actor) {
      fetchInitialData(actor);
    }
  }, []);

  const fetchInitialData = async (actor) => {
    try {
      const wishCoinsBalance = await actor.getWishCoinsBalance();
      setWishCoins(wishCoinsBalance);
      const transactionHistory = await actor.getTransactionHistory();
      setTransactionHistory(transactionHistory);
    } catch (err) {
      console.error('Failed to fetch initial data:', err);
    }
  };

  const handleSend = async () => {
    if (reportCaseActor && sendAmount > 0 && recipient) {
      try {
        await reportCaseActor.sendWishCoins(sendAmount, recipient);
        setWishCoins(prev => prev - sendAmount);
        setTransactionHistory(prev => [...prev, { type: 'send', amount: sendAmount, recipient }]);
        setSendAmount(0);
        setRecipient('');
      } catch (err) {
        console.error('Failed to send wish coins:', err);
        alert('Failed to send wish coins');
      }
    }
  };

  const handleDonate = async () => {
    if (reportCaseActor && donateAmount > 0) {
      try {
        await reportCaseActor.donateWishCoins(donateAmount);
        setWishCoins(prev => prev + donateAmount);
        setTransactionHistory(prev => [...prev, { type: 'donate', amount: donateAmount }]);
        setDonateAmount(0);
      } catch (err) {
        console.error('Failed to donate wish coins:', err);
        alert('Failed to donate wish coins');
      }
    }
  };

  return (
    <div className="wallet-container">
      <h2>Wallet</h2>
      <p className="balance">Wish Coins Balance: {wishCoins}</p>
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <ul>
          {transactionHistory.map((transaction, index) => (
            <li key={index}>
              {transaction.type} - {transaction.amount} wish coins
              {transaction.recipient && ` to ${transaction.recipient}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="actions">
        <h3>Send</h3>
        <input
          type="number"
          value={sendAmount}
          onChange={(e) => setSendAmount(parseFloat(e.target.value))}
          placeholder="Amount to send"
        />
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient email"
        />
        <button className="action-button" onClick={handleSend}>Send Wish Coins</button>

        <h3>Donate</h3>
        <input
          type="number"
          value={donateAmount}
          onChange={(e) => setDonateAmount(parseFloat(e.target.value))}
          placeholder="Amount to donate"
        />
        <button className="action-button" onClick={handleDonate}>Donate Wish Coins</button>
      </div>
    </div>
  );
};

export default Wallet;
