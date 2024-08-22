import React, { useState } from 'react';
import donationHubActor from '../../../dfx/index3';

const DonationForm = () => {
  const [cause, setCause] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const donor = 'User'; // Replace with actual user identifier
      const result = await donationHubActor.donate(donor, Number(amount), cause);
      alert(result);
    } catch (error) {
      console.error('Error submitting donation:', error);
      setError('Failed to donate. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <div>
        <label>Cause:</label>
        <input value={cause} onChange={(e) => setCause(e.target.value)} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Donate</button>
    </form>
  );
};

export default DonationForm;
