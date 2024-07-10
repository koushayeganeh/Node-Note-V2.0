// modal.js

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const modalElem = document.getElementById("loginModal");
  const closeBtn = document.querySelector(".close");
  const loginForm = document.getElementById("loginForm");

  // Open modal when login button is clicked
  document.addEventListener("click", function (event) {
    if (event.target.closest("#loginButton")) {
      const modalElem = document.getElementById("loginModal");
      modalElem.style.display = "block";
    }
  });

  // Close modal when close button (X) is clicked
  closeBtn.addEventListener("click", function () {
    modalElem.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === modalElem) {
      modalElem.style.display = "none";
    }
  });

  // Handle form submission
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Replace with your actual authentication logic (e.g., using Passport.js)
    console.log("Username:", username);
    console.log("Password:", password);

    // Close modal after handling login action
    modalElem.style.display = "none";
    // You can redirect or perform further actions here
  });

  // Handle actions for Google authentication button
  document
    .getElementById("googleAuthBtn")
    .addEventListener("click", function () {
      // Implement your Google authentication logic here (e.g., redirect to Google OAuth endpoint)
      console.log("Redirecting to Google OAuth");
      // Close modal after handling login action
      modalElem.style.display = "none";
    });
});
