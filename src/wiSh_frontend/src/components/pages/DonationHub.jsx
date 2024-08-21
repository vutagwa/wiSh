import React, { useState } from 'react';

const DonationCampaigns = () => {
    const [wishCoins, setWishCoins] = useState(100);
    const [donationAmount, setDonationAmount] = useState(0);
    const [campaigns, setCampaigns] = useState([
        { id: 1, name: 'Homocide affected families', description: 'Lorem, ipsum dolor sit it, otam cumque recusandae. Suscipit ducimus maiores debitis eos fuga dolores provident.', goal: 1000, raised: 500 },
        { id: 2, name: 'suicide survivers', description: 'Lorem, ipsum dolor sit it, otam cumque recusandae. Suscipit ducimus maiores debitis eos fuga dolores provident.', goal: 5000, raised: 2000 },
        { id: 3, name: 'Rape and assualt survivours', description: 'Lorem, ipsum dolor sit it, otam cumque recusandae. Suscipit ducimus maiores debitis eos fuga dolores provident.', goal: 2000, raised: 1000 },
        { id: 4, name: 'FGM elimination', description: 'Lorem, ipsum dolor sit it, otam cumque recusandae. Suscipit ducimus maiores debitis eos fuga dolores provident.', goal: 3000, raised: 1500 },
        { id: 5, name: 'Human rights advocacy', description: 'Support clean water access for remote areas', goal: 2500, raised: 800 },
        { id: 6, name: 'Coercion and grooming awareness', description: 'Support human rights and social justice initiatives', goal: 4000, raised: 2200 },
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
            <p className="balance">💰 Balance: {wishCoins} Wish Coins</p>
            <input
                type="number"
                value={donationAmount}
                onChange={handleDonationChange}
                placeholder="Enter donation amount"
                className="donation-input"
            />
            <div className="campaigns-grid">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="campaign-card">
                        <h3>{campaign.name}</h3>
                        <p>{campaign.description}</p>
                        <p>Goal: {campaign.goal} Wish Coins</p>
                        <p>Raised: {campaign.raised} Wish Coins</p>
                        <button onClick={() => handleDonate(campaign.id)} className="donate-button">Donate</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationCampaigns;
