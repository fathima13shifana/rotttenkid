// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBl5z5RncJxo8_Gkr9tHWSWvCXicmW3KEU",
    authDomain: "padshare-f3970.firebaseapp.com",
    projectId: "padshare-f3970",
    storageBucket: "padshare-f3970.firebasestorage.app",
    messagingSenderId: "878619445609",
    appId: "1:878619445609:web:0b2459fee3acc17ddc15f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase configuration
export { firebaseConfig };