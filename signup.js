// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Import Firebase configuration
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Signup Form Submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const fullName = document.getElementById("fullName").value;
    const department = document.getElementById("department").value;
    const classNumber = document.getElementById("classNumber").value;
    const year = document.getElementById("year").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const password = document.getElementById("password").value;

    try {
        // Generate a unique ID for the user (you can use a library like uuid if needed)
        const userId = Date.now().toString(); // Simple unique ID based on timestamp

        // Save user data to Firestore
        await setDoc(doc(db, "users", userId), {
            fullName,
            department,
            classNumber,
            year,
            email,
            phoneNumber,
            password, // Note: Storing passwords in plaintext is not secure. Use hashing in production.
        });

        alert("Signup successful! Redirecting to home page...");
        window.location.href = "home.html"; // Redirect to home page
    } catch (error) {
        console.error("Error during signup:", error);
        alert(error.message); // Show error message
    }
});