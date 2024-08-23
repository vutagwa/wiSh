import React, { useState, useEffect } from 'react';
import donationHubActor from '../../../dfx/index3';
import walletActor from '../../../dfx/index4';
import 'bootstrap/dist/css/bootstrap.min.css';

const Campaigns = ({ user }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setCampaigns([
      { id: 1, name: 'femicide campaign', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' }, 
      { id: 2, name: 'Child protection and saving', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
      // Add more campaigns here
    ]);
  }, []);

  const handleDonate = async (campaignId) => {
    const amount = prompt('Enter the amount you wish to donate:');
    if (amount && !isNaN(amount) && Number(amount) > 0) {
      try {
        const balance = await walletActor.getBalance(user);
        if (Number(amount) > balance) {
          alert('Insufficient funds.');
          return;
        }
        const result = await donationHubActor.donate(user, Number(amount), `Campaign ${campaignId}`);
        alert(result);
        // Deduct amount from wallet
        await walletActor.withdraw(user, Number(amount));
      } catch (error) {
        console.error('Error submitting donation:', error);
        setError('Failed to donate. Please try again.');
      }
    } else {
      alert('Invalid amount.');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Donation Campaigns</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{campaign.name}</h5>
            <p className="card-text">{campaign.description}</p>
            <button className="btn btn-primary" onClick={() => handleDonate(campaign.id)}>
              Donate
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Campaigns;
