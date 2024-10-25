// server/config/firebase-config.js
const admin = require('firebase-admin');
const serviceAccount = require('./degen-hunter-76883-default-rtdb-export.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://degen-hunter-76883-default-rtdb.firebaseio.com/'
});

const db = admin.database();
module.exports = db;
