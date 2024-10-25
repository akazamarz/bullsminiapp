// server/app.js
const express = require('express');
const cors = require('cors');
const db = require('./config/firebase-config.js');  // Firebase config file
const app = express();

app.use(cors());
app.use(express.json());

// Example endpoint to get user data
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
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
