const admin = require('firebase-admin');

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set.");
}

// Parse the service account JSON from the environment variable
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT.replace(/\\n/g, '\n')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://degen-hunter-76883-default-rtdb.firebaseio.com",
});

const db = admin.database();
module.exports = db;
