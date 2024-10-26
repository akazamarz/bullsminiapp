const admin = require('firebase-admin');

try {
  // Ensure FIREBASE_SERVICE_ACCOUNT is available
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set.");
  }

  // Parse the JSON string from the environment variable, replacing \\n with actual newline characters
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT.replace(/\\n/g, '\n')
  );

  // Initialize Firebase with the parsed service account
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://degen-hunter-76883-default-rtdb.firebaseio.com",
  });

} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error.message);
  throw error; // Re-throw the error after logging it
}

const db = admin.database();
module.exports = db;
