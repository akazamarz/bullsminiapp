const express = require('express');
const cors = require('cors');
const firebase = require('firebase/app');
require('firebase/database');  // Include the Firebase Realtime Database

// Initialize Firebase using the client SDK configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3EnHiULjNCjZp_dNwQ8pVUp1V5LyZy54",
  authDomain: "degen-hunter-76883.firebaseapp.com",
  databaseURL: "https://degen-hunter-76883-default-rtdb.firebaseio.com",
  projectId: "degen-hunter-76883",
  storageBucket: "degen-hunter-76883.appspot.com",
  messagingSenderId: "218677301832",
  appId: "1:218677301832:web:0d7d66c23645341ca07e7d",
  measurementId: "G-G25PFHYJWE"
};

firebase.initializeApp(firebaseConfig);  // Initialize Firebase
const db = firebase.database();  // Use Firebase Realtime Database

const app = express();
app.use(cors());
app.use(express.json());

// Base URL Route to show a message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to BullsMiniApp API',
    endpoints: {
      getUserData: '/api/getUserData?telegramId=YOUR_TELEGRAM_ID'
    },
    note: 'Replace YOUR_TELEGRAM_ID with a valid Telegram ID to retrieve data.'
  });
});

// Example API route to fetch user data
app.get('/api/getUserData', async (req, res) => {
  const telegramId = req.query.telegramId;

  if (!telegramId) {
    return res.status(400).json({ error: 'Telegram ID is required' });
  }

  try {
    const userRef = db.ref(`users/${telegramId}`);
    userRef.once('value', snapshot => {
      if (!snapshot.exists()) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(snapshot.val());
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
