// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAcY9ThCTPk0-MpVlyr_kKZChJk6YNkiQ",
  authDomain: "pointmaster-79d9a.firebaseapp.com",
  projectId: "pointmaster-79d9a",
  storageBucket: "pointmaster-79d9a.appspot.com",
  messagingSenderId: "1071719914829",
  appId: "1:1071719914829:web:e1abe41079d28bb583ab04",
  measurementId: "G-3MLE9QEVS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);  // Corrected export for storage
