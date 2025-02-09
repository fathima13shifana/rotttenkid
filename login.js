import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Import Firebase configuration
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Login Form Submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        // Query Firestore to check if the user exists
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", username), where("password", "==", password));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // User found
            // Get the document ID of the user
            const userDoc = querySnapshot.docs[0]; // Get the first matching document
            const userId = userDoc.id; // Get the document ID

            // Save the document ID to localStorage
            localStorage.setItem("username", userId);

            alert("Login successful! Redirecting to home page...");
            window.location.href = "home.html"; // Redirect to home page
        } else {
            // User not found
            alert("Invalid username or password. Please try again.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
    }
});