// dashboard.js

// Import the initialized Firebase app and database
import { database } from './firebase-config.js';
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';
import { getTelegramIdFromSession } from './session.js';

// Cache key names for session storage
const USER_CACHE_KEY = 'cachedUserData';

// Get the Telegram ID from session storage
const telegramId = getTelegramIdFromSession();

if (telegramId) {
    console.log("Telegram ID found:", telegramId);

    // Check if user data is cached in session storage
    const cachedUserData = sessionStorage.getItem(USER_CACHE_KEY);

    if (cachedUserData) {
        console.log("Using cached data for user dashboard.");
        updateDashboard(JSON.parse(cachedUserData));
    }

    // Always fetch fresh data from Firebase to ensure accuracy, but only update if necessary
    const userRef = ref(database, 'users/' + telegramId);
    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            console.log("Fetched fresh user data:", userData);

            // Compare the fetched data with cached data, update if different
            const cachedData = JSON.parse(sessionStorage.getItem(USER_CACHE_KEY) || '{}');
            const isDataUpdated = JSON.stringify(cachedData) !== JSON.stringify(userData);

            if (isDataUpdated) {
                // Cache the new data in session storage
                sessionStorage.setItem(USER_CACHE_KEY, JSON.stringify(userData));
                // Update the dashboard
                updateDashboard(userData);
            }
        } else {
            console.log("No data found for this user.");
        }
    });

} else {
    console.log("Telegram ID not found in session storage.");
}

/**
 * Function to update the dashboard elements
 * @param {Object} userData - The user data fetched from Firebase
 */
function updateDashboard(userData) {
    // Format values and add commas using toLocaleString()
    const formattedBalance = (userData.balance || 0).toLocaleString();
    const formattedTickets = (userData.tickets || 0).toLocaleString();
    const formattedMultiplier = 'x' + (userData.multiplier || 1).toLocaleString();

    // Update HTML elements
    document.getElementById('balance').textContent = formattedBalance;
    document.getElementById('tickets-left').textContent = formattedTickets;
    document.getElementById('multiplier').textContent = formattedMultiplier;
    document.getElementById('username').textContent = userData.username || 'User';
            }
