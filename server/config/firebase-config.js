// server/config/firebase-config.js
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-firebase-admin-sdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-project-id.firebaseio.com'
});

const db = admin.database();
module.exports = db;
