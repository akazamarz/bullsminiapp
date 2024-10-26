const admin = require('firebase-admin');

// Parse the private key JSON from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://degen-hunter-76883-default-rtdb.firebaseio.com'
});

const db = admin.database();
module.exports = db;
