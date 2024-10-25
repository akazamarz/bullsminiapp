const express = require('express');
const cors = require('cors');
const db = require('./config/firebase-config');  // Ensure this path is correct
const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Log when the server starts
console.log('Express server starting...');

// Base URL route with a custom message
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

// API route to fetch user data from Firebase
app.get('/api/getUserData', async (req, res) => {
    const telegramId = req.query.telegramId;
    
    // Log the request details
    console.log(`Received request for Telegram ID: ${telegramId}`);
    
    // Check if telegramId is provided
    if (!telegramId) {
        console.log('Telegram ID not provided');
        return res.status(400).json({ error: 'Telegram ID is required' });
    }

    try {
        // Fetch user data from Firebase
        console.log(`Fetching user data for Telegram ID: ${telegramId}`);
        const userRef = db.ref(`users/${telegramId}`);
        const snapshot = await userRef.get();
        
        // Log if user is not found
        if (!snapshot.exists()) {
            console.log(`User not found for Telegram ID: ${telegramId}`);
            return res.status(404).json({ error: 'User not found' });
        }

        // Log success and send user data
        console.log(`User data found for Telegram ID: ${telegramId}`, snapshot.val());
        res.json(snapshot.val());

    } catch (error) {
        // Log the error and respond with 500
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Start the server (for local testing or debugging)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Export the Express app for Vercel
module.exports = app;
