import React, { useState, useEffect } from 'react';
import walletActor from '../../../dfx/index4';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="card mb-3 balance-card">
      <div className="card-body">
        <h3 className="card-title">Current Balance</h3>
        <p className="card-text">Wish Coins: {balance}</p>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

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
    <div className="card mb-3 deposit-card">
      <div className="card-body">
        <h4 className="card-title">Deposit Tokens</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="depositAmount" className="form-label">Amount:</label>
            <input
              id="depositAmount"
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}
          <button type="submit" className="btn btn-primary">Deposit</button>
        </form>
      </div>
    </div>
  );
};

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
    <div className="card mb-3 withdraw-card">
      <div className="card-body">
        <h4 className="card-title">Withdraw Tokens</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="withdrawAmount" className="form-label">Amount:</label>
            <input
              id="withdrawAmount"
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}
          <button type="submit" className="btn btn-primary">Withdraw</button>
        </form>
      </div>
    </div>
  );
};

const Wallet = ({ user }) => {
  return (
    <div className="container wallet-container">
      <h2 className="my-4">Wallet Management</h2>
      <BalanceDisplay user={user} />
      <DepositForm user={user} />
      <WithdrawForm user={user} />
    </div>
  );
};

export default Wallet;
