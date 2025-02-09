// Import Firebase modules
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

// DOM Elements
const departmentTableBody = document.getElementById("departmentTableBody");
const filterInput = document.getElementById("filterInput");
const modal = document.getElementById("departmentModal");
const modalUserName = document.getElementById("modalUserName");
const modalDepartment = document.getElementById("modalDepartment");
const modalContact = document.getElementById("modalContact");
const closeBtn = document.querySelector(".close");

// Fetch and display data
async function fetchAndDisplayData() {
    try {
        // Query the users collection
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);

        // Clear the table body
        departmentTableBody.innerHTML = "";

        // Loop through each user document
        usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();
            const stockUpdates = userData.stockUpdates || [];

            // Filter stockUpdates where quantity > 0
            const validStockUpdates = stockUpdates.filter((update) => update.quantity > 0);

            if (validStockUpdates.length > 0) {
                // Display each valid stock update
                validStockUpdates.forEach((update) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${userData.fullName}</td>
                        <td>${userData.department}</td>
                        <td><button class="view-btn" data-user="${userData.fullName}" data-department="${userData.department}" data-contact="${userData.phoneNumber}">View</button></td>
                    `;
                    departmentTableBody.appendChild(row);
                });
            }
        });

        // Add event listeners to view buttons
        document.querySelectorAll(".view-btn").forEach((button) => {
            button.addEventListener("click", () => {
                const userName = button.getAttribute("data-user");
                const department = button.getAttribute("data-department");
                const contact = button.getAttribute("data-contact");

                // Populate modal with user details
                modalUserName.textContent = userName;
                modalDepartment.textContent = department;
                modalContact.setAttribute("href", `tel:${contact}`);

                // Show the modal
                modal.style.display = "block";
            });
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data. Please try again.");
    }
}

// Close modal when the close button is clicked
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside the modal
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Filter table rows based on input
filterInput.addEventListener("input", () => {
    const filterValue = filterInput.value.toLowerCase();
    const rows = document.querySelectorAll("#departmentTableBody tr");

    rows.forEach((row) => {
        const department = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        if (department.includes(filterValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

// Call fetchAndDisplayData on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayData();
});