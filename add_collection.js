// DOM elements
const modal = document.getElementById("collectionModal");
const btn = document.getElementById("addCollectionBtn");
const form = document.getElementById("collectionForm");

// Show modal
btn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Reset form when modal closes
modal.addEventListener("transitionend", () => {
  if (modal.style.display === "none") {
    form.reset();
  }
});
