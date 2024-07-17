document.addEventListener("DOMContentLoaded", function () {
  const deleteButton = document.getElementById("deleteButton");
  const modalElem = document.getElementById("deleteModal");
  const closeBtn = document.querySelector(".close");
  const discardBtn = document.getElementById("deleteDiscard");
  const loginForm = document.getElementById("loginForm");
  const errorContainer = document.getElementById("errorContainer");

  function closeModal() {
    modalElem.style.display = "none";
    sessionStorage.setItem("modalOpen", "false");
  }

  function openModal() {
    modalElem.style.display = "block";
    sessionStorage.setItem("modalOpen", "true");
  }

  // Open modal when delete button (out of the modal) is clicked
  deleteButton.addEventListener("click", function () {
    openModal();
    history.pushState(null, null, location.href); // Push a state to handle back button correctly
  });

  // Close modal when close button (X) is clicked
  closeBtn.addEventListener("click", function () {
    closeModal();
  });

  // Close modal when discard button is clicked
  discardBtn.addEventListener("click", function () {
    closeModal();
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === modalElem) {
      closeModal();
    }
  });

  // Delete note when delete button (inside the modal) is clicked
  // this is handled by the delet button as a form in the note page itself

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

  // Reset modal state when navigating away from the page
  window.addEventListener("beforeunload", function () {
    sessionStorage.setItem("modalOpen", "false");
  });
});
