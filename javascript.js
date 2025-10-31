// Scroll function
function scrollCards(direction) {
  const wrapper = document.querySelector('.scroll-wrapper');
  const card = document.querySelector('.card-card');
  if (!wrapper || !card) return;

  const cardWidth = card.offsetWidth + 20; // card + gap
  wrapper.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
}

// Open card detail page
function openCardDetailPage(cardId) {
  window.location.href = `card_detail.html?id=${cardId}`;
}

// Open collection detail page
function openCollectionDetailPage(collectionId) {
  window.location.href = `collection_detail.html?id=${collectionId}`;
}

// Search function
function redirectToSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    window.location.href = `../search_results.html?q=${encodeURIComponent(query)}`;
  }
}

// Read more toggle
function readMore() {
  const dots = document.getElementById("dots");
  const moreText = document.getElementById("more");
  const btnText = document.getElementById("readMoreButton");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    moreText.classList.remove("show");
    moreText.style.display = "none";
    btnText.innerHTML = "Read more";
  } else {
    dots.style.display = "none";
    moreText.classList.add("show");
    moreText.style.display = "inline";
    btnText.innerHTML = "Read less";
  }
}

// Close offer dialog
function closeDialog() {
  document.getElementById('offerDialog').style.display = 'none';
}

// Google Translate init
function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
}

// Text-to-speech
document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById('textInput');
  const speakButton = document.getElementById('speakButton');

  if (speakButton && textInput) {
    speakButton.addEventListener('click', () => {
      const textToSpeak = textInput.value;
      if (textToSpeak.trim() !== '') {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        window.speechSynthesis.speak(utterance);
      }
    });
  }
});


