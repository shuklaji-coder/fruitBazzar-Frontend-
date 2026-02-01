// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithCredential } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM6IE-JdQN6ajd7d7fZTffFWQwsVAJOYM",
  authDomain: "sastaa-bazzar.firebaseapp.com",
  projectId: "sastaa-bazzar",
  storageBucket: "sastaa-bazzar.firebasestorage.app",
  messagingSenderId: "563416710723",
  appId: "1:563416710723:web:5f402816e146bd09a91ef6",
  measurementId: "G-N6TY1YTDM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider, signInWithPopup, signInWithCredential, analytics };

// Helper function to verify Google token with backend
export const verifyGoogleToken = async (idToken) => {
  try {
    // This will be used to verify the token with your backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw error;
  }
};
