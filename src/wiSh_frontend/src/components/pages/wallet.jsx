import React, { useState } from 'react';
import { useWishCoins } from './WishCoinsContext';

const Wallet = () => {
    const { wishCoins, transactionHistory, updateWishCoins, addTransaction } = useWishCoins();
    const [recipient, setRecipient] = useState('');
    const [sendAmount, setSendAmount] = useState(0);
    const [donateAmount, setDonateAmount] = useState(0);

    const handleSend = async () => {
        if (sendAmount > 0 && recipient) {
            try {
                await reportCaseActor.sendWishCoins(sendAmount, recipient);
                await updateWishCoins();
                addTransaction({ type: 'send', amount: sendAmount, recipient });
                setSendAmount(0);
                setRecipient('');
            } catch (err) {
                console.error('Failed to send wish coins:', err);
                alert('Failed to send wish coins');
            }
        }
    };

    const handleDonate = async () => {
        if (donateAmount > 0) {
            try {
                await reportCaseActor.donateWishCoins(donateAmount);
                await updateWishCoins();
                addTransaction({ type: 'donate', amount: donateAmount });
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
