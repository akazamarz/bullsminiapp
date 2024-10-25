const express = require('express');  // Ensure Express is imported
const cors = require('cors');        // Ensure CORS is imported and used
const db = require('../config/firebase-config');  // Adjust the path as necessary

const app = express();  // This line initializes the Express app

app.use(cors());
app.use(express.json());

// Base URL Route to show a message
app.get('/', (req, res) => {
    console.log('Base URL accessed');
    res.json({
        message: 'Welcome to BullsMiniApp API',
        endpoints: {
            getUserData: '/api/getUserData?telegramId=YOUR_TELEGRAM_ID'
        },
        note: 'Replace YOUR_TELEGRAM_ID with a valid Telegram ID to retrieve data.'
    });
});

// Example API route to fetch user data from Firebase
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

// Ensure the app is exported
module.exports = app;
