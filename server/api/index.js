// server/api/index.js
import express from 'express';
import cors from 'cors';
import { database } from './config/firebase-config.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';

const app = express();
app.use(cors());
app.use(express.json());

// Base URL route to show a welcome message
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the BullsMiniApp API!',
        availableEndpoints: {
            getUserData: '/api/getUserData?telegramId=YOUR_TELEGRAM_ID'
        },
        note: 'Replace YOUR_TELEGRAM_ID with a valid Telegram ID to retrieve data.'
    });
});

// Sample route to fetch user data by Telegram ID
app.get('/api/getUserData', async (req, res) => {
    const { telegramId } = req.query;
    if (!telegramId) {
        return res.status(400).json({ error: 'Telegram ID is required' });
    }

    try {
        const userRef = ref(database, `users/${telegramId}`);
        const snapshot = await get(userRef);
        
        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(snapshot.val());
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Starting server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
