// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBEj5_zAjpy0yPxG1rPttJfyaE4wf_mH0",
  authDomain: "urban-closet-f40c8.firebaseapp.com",
  projectId: "urban-closet-f40c8",
  storageBucket: "urban-closet-f40c8.firebasestorage.app",
  messagingSenderId: "77899267104",
  appId: "1:77899267104:web:a3563dc06813a237615045",
  measurementId: "G-WVQCC0VNC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
