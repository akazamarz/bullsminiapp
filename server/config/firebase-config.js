const admin = require('firebase-admin');

// Parse the JSON string from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://degen-hunter-76883-default-rtdb.firebaseio.com'
});

const db = admin.database();
module.exports = db;
