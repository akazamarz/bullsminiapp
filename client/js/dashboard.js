// client/js/dashboard.js

document.addEventListener("DOMContentLoaded", () => {
    fetchUserData();  // Call fetchUserData on page load
});

async function fetchUserData() {
    const telegramId = sessionStorage.getItem('telegram_id');
    if (!telegramId) {
        console.error("No Telegram ID found in session storage.");
        return;
    }

    try {
        const response = await fetch(`https://bullsminiapp.vercel.app/api/getUserData?telegramId=${telegramId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        console.log("Fetched user data:", userData);  // For debugging
        updateDashboard(userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

function updateDashboard(userData) {
    const formattedBalance = (userData.balance || 0).toLocaleString();
    const formattedTickets = (userData.tickets || 0).toLocaleString();
    const formattedMultiplier = 'x' + (userData.multiplier || 1).toLocaleString();

    document.getElementById('balance').textContent = formattedBalance;
    document.getElementById('tickets-left').textContent = formattedTickets;
    document.getElementById('multiplier').textContent = formattedMultiplier;
    document.getElementById('username').textContent = userData.username || 'User';
}
