export const fetchWishCoinsFromBackend = async (userId) => {
    try {
        const response = await fetch(`/api/get-wish-coins/${userId}`);
        const data = await response.json();
        return data.balance;
    } catch (error) {
        console.error('Failed to fetch wish coins:', error);
        return 0;
    }
};

export const sendWishCoinsToBackend = async (senderId, recipientId, amount) => {
    try {
        const response = await fetch('/api/send-wish-coins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senderId, recipientId, amount }),
        });
        return response.json();
    } catch (error) {
        console.error('Failed to send wish coins:', error);
        throw error;
    }
};

export const donateWishCoinsToBackend = async (userId, campaignId, amount) => {
    try {
        const response = await fetch('/api/donate-wish-coins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, campaignId, amount }),
        });
        return response.json();
    } catch (error) {
        console.error('Failed to donate wish coins:', error);
        throw error;
    }
};
