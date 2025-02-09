 // Import Firebase modules
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
 import {
     getFirestore,
     doc,
     setDoc,
     updateDoc,
     arrayUnion,
 } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

 // Import Firebase configuration
 import { firebaseConfig } from "./firebase-config.js";

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

 // Get the logged-in user's email from localStorage
 const loggedInUser = localStorage.getItem("username");

 // Update Stock Form Submission
 document.getElementById("updateStockForm").addEventListener("submit", async (e) => {
     e.preventDefault();

     // Get form values
     const padType = document.querySelector("#updateStockForm select").value;
     const quantity = document.querySelector("#updateStockForm input[type='number']").value;

     if (!loggedInUser) {
         alert("You must be logged in to update stock.");
         window.location.href = "login.html"; // Redirect to login page
         return;
     }

     try {
         // Reference the user's document in Firestore
         const userRef = doc(db, "users", loggedInUser);

         // Add the stock update details to the user's document
         await updateDoc(userRef, {
             stockUpdates: arrayUnion({
                 padType,
                 quantity: parseInt(quantity),
                 timestamp: new Date().toISOString(),
             }),
         });

         alert("Stock updated successfully!");
         window.location.href = "home.html"; // Redirect to home page
     } catch (error) {
         console.error("Error updating stock:", error);
         alert("An error occurred. Please try again.");
     }
 });