//Scroll funtion
function scrollCards(direction) {
    const wrapper = document.querySelector('.scroll-wrapper');
    const cardWidth = document.querySelector('.card-card').offsetWidth + 20; // card + gap
    wrapper.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
    });
}

function openCardDetailPage(cardId) {
    window.location.href = `card_detail.html?id=${cardId}`;
}

function openCollectionDetailPage(collectionId) {
    window.location.href = `collection_detail.html?id=${collectionId}`;
}

//Search Funciton
function redirectToSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    window.location.href = `/Shadow-Vault/search_results.html?q=${encodeURIComponent(query)}`;
  }
}

function readMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readMoreButton");

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

function closeDialog() {
  document.getElementById('offerDialog').style.display = 'none';
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');

speakButton.addEventListener('click', () => {
    const textToSpeak = textInput.value;

    if (textToSpeak.trim() !== '') {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        window.speechSynthesis.speak(utterance);
    }

});
