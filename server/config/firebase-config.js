// use firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';

// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
