// DOM elements
const modal = document.getElementById("cardModal");
const btn = document.getElementById("addCardBtn");
const form = document.getElementById("cardForm");

// Show modal
btn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal when clicking outside the modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Form submission (no backend logic)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Handle local validation
  const cardName = document.getElementById("cardName").value;
  const cardType = document.getElementById("cardType").value;
  const cardImage = document.getElementById("cardImage").files[0];

  if (!cardName || !cardType || !cardImage) {
    alert("Please fill out required fields.");
    return;
  }

  form.reset();
  modal.style.display = "none";
});