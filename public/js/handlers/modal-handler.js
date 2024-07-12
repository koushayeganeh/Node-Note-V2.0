document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const modalElem = document.getElementById("loginModal");
  const closeBtn = document.querySelector(".close");
  const loginForm = document.getElementById("loginForm");
  const errorContainer = document.getElementById("errorContainer");

  function clearMessagesAndInputs() {
    // Clear the error message
    errorContainer.innerHTML = "";
    errorContainer.style.display = "none";

    // Clear form inputs
    loginForm.reset();
  }

  function closeModal() {
    modalElem.style.display = "none";
    clearMessagesAndInputs();
    sessionStorage.setItem("modalOpen", "false");
  }

  function openModal() {
    modalElem.style.display = "block";
    clearMessagesAndInputs(); // Clear messages and inputs when opening modal
    sessionStorage.setItem("modalOpen", "true");
  }

  // Open modal when login button is clicked
  loginButton.addEventListener("click", function () {
    openModal();
    history.pushState(null, null, location.href); // Push a state to handle back button correctly
  });

  // Close modal when close button (X) is clicked
  closeBtn.addEventListener("click", function () {
    closeModal();
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === modalElem) {
      closeModal();
    }
  });

  // Handle form submission with AJAX
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new URLSearchParams(new FormData(loginForm)).toString();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          clearMessagesAndInputs(); // Clear messages and inputs on successful login
          sessionStorage.setItem("modalOpen", "false");
          window.location.href = "/dashboard";
        } else {
          errorContainer.innerHTML = `<div class="error">${data.message}</div>`;
          errorContainer.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errorContainer.innerHTML = `<div class="error">An error occurred. Please try again later.</div>`;
        errorContainer.style.display = "block";
      });
  });

  // Handle actions for Google authentication button
  document
    .getElementById("googleAuthBtn")
    .addEventListener("click", function () {
      console.log("Redirecting to Google OAuth");
      // Implement your Google authentication logic here (e.g., redirect to Google OAuth endpoint)
      modalElem.style.display = "none";
    });

  // Handle browser back button
  window.addEventListener("popstate", function (event) {
    const state = event.state || {};
    if (state.modalOpen) {
      openModal();
    } else {
      closeModal();
    }
  });

  // Ensure modal state is correctly set on initial load
  const modalState = sessionStorage.getItem("modalOpen");
  if (modalState === "true") {
    openModal();
  } else {
    closeModal();
  }
});
