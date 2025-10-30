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
    window.location.href = `/search_results.html?q=${encodeURIComponent(query)}`;
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

