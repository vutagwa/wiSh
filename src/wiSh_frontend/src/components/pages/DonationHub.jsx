import React, { useState } from 'react';

const DonationCampaigns = () => {
    const [wishCoins, setWishCoins] = useState(100);
    const [donationAmount, setDonationAmount] = useState(0);
    const [campaigns, setCampaigns] = useState([
        { id: 1, name: 'Education for All', description: 'Support education for underprivileged children', goal: 1000, raised: 500 },
        { id: 2, name: 'Climate Action Now', description: 'Support climate change mitigation efforts', goal: 5000, raised: 2000 },
        { id: 3, name: 'Healthcare for All', description: 'Support healthcare initiatives for marginalized communities', goal: 2000, raised: 1000 },
    ]);

    const handleDonationChange = (e) => {
        setDonationAmount(e.target.value);
    };

    const handleDonate = (campaignId) => {
        const campaign = campaigns.find((c) => c.id === campaignId);
        if (campaign && donationAmount > 0 && donationAmount <= wishCoins) {
            const newRaised = campaign.raised + parseFloat(donationAmount);
            setCampaigns(campaigns.map((c) =>
                c.id === campaignId ? { ...c, raised: newRaised } : c
            ));
            setWishCoins(wishCoins - parseFloat(donationAmount));
            setDonationAmount(0);
        }
    };

    return (
        <div className="donation-container">
            <h2>Donate to a Campaign</h2>
            <p>Wish Coins Balance: {wishCoins}</p>
            <input
                type="number"
                value={donationAmount}
                onChange={handleDonationChange}
                placeholder="Enter donation amount"
            />
            <ul>
                {campaigns.map((campaign) => (
                    <li key={campaign.id}>
                        <h3>{campaign.name}</h3>
                        <p>{campaign.description}</p>
                        <p>Goal: {campaign.goal} Wish Coins</p>
                        <p>Raised: {campaign.raised} Wish Coins</p>
                        <button onClick={() => handleDonate(campaign.id)}>Donate</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DonationCampaigns;
