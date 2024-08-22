import React, { useState, useEffect } from 'react';
import walletActor from '../../../dfx/index4'; // Adjust the import path as needed

// Component to display the balance
const BalanceDisplay = ({ user }) => {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userBalance = await walletActor.getBalance(user);
        setBalance(userBalance);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setError('Failed to fetch balance. Please try again.');
      }
    };
    fetchBalance();
  }, [user]);

  return (
    <div style={{ margin: '20px' }}>
      <h3>Current Balance: {balance} Wish Coins</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

// Component to handle depositing tokens
const DepositForm = ({ user }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (amount <= 0) {
        setError('Deposit amount must be greater than 0.');
        return;
      }
      const result = await walletActor.deposit(user, Number(amount));
      setMessage(result);
      setAmount('');
      setError('');
    } catch (error) {
      console.error('Error depositing tokens:', error);
      setError('Failed to deposit tokens. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p>{message}</p>}
      <button type="submit">Deposit</button>
    </form>
  );
};

// Component to handle withdrawing tokens
const WithdrawForm = ({ user }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (amount <= 0) {
        setError('Withdrawal amount must be greater than 0.');
        return;
      }
      const result = await walletActor.withdraw(user, Number(amount));
      setMessage(result);
      setAmount('');
      setError('');
    } catch (error) {
      console.error('Error withdrawing tokens:', error);
      setError('Failed to withdraw tokens. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p>{message}</p>}
      <button type="submit">Withdraw</button>
    </form>
  );
};

// Main Wallet component that includes BalanceDisplay, DepositForm, and WithdrawForm
const Wallet = ({ user }) => {
  return (
    <div>
      <BalanceDisplay user={user} />
      <DepositForm user={user} />
      <WithdrawForm user={user} />
    </div>
  );
};

export default Wallet;
