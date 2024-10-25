const express = require('express');
const cors = require('cors');
const db = require('./config/firebase-config');  // Ensure this path is correct
const app = express();

app.use(cors());
app.use(express.json());

// Base URL Route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to BullsMiniApp API',
        endpoints: {
            getUserData: '/api/getUserData?telegramId=YOUR_TELEGRAM_ID'
        }
    });
});

// Example API route
app.get('/api/getUserData', async (req, res) => {
    const telegramId = req.query.telegramId;
    if (!telegramId) {
        return res.status(400).json({ error: 'Telegram ID is required' });
    }

    try {
        const userRef = db.ref(`users/${telegramId}`);
        const snapshot = await userRef.get();
        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(snapshot.val());
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Export the Express app
module.exports = app;
