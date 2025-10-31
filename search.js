// Import Supabase library and setup connection to database
import { supabase } from './Shadow-Vault/initdb.js';

//Avoid Errors
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (match) {
    const escape = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return escape[match];
  });
}

//Provide User Feedback on Seach Input
function displaySearchQuery() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") || "";
    if (!query) return;
    document.getElementById("searchQuery").textContent = query;
}
window.onload = function() {
    displaySearchQuery();
    loadSearchResults();
};

//Display Search Results on New Search Page
async function loadSearchResults() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q")?.toLowerCase() || "";

  // Fetch cards from Supabase
  const { data: cardsData, error: cardError } = await supabase
    .from('cards')
    .select('*');

  if (cardError) {
    console.error("Error fetching cards:", cardError);
    return;
  }

  // Fetch collections from Supabase
  const { data: collectionsData, error: collectionError } = await supabase
    .from('collections')
    .select('*');

  if (collectionError) {
    console.error("Error fetching collections:", collectionError);
    return;
  }

  // Filter cards
  const filteredCards = cardsData.filter(card =>
    card.title?.toLowerCase().includes(query) ||
    card.type?.toLowerCase().includes(query) ||
    card.set?.toLowerCase().includes(query) ||
    card.rarity?.toLowerCase().includes(query)
  );

  // Filter collections
  const filteredCollections = collectionsData.filter(collection =>
    collection.name?.toLowerCase().includes(query) ||
    collection.description?.toLowerCase().includes(query)
  );

  // Render results
  const cardResults = document.getElementById("cardResults");
  const collectionResults = document.getElementById("collectionList");

  if (cardResults) {
    cardResults.innerHTML = filteredCards.length
      ? displayCards(filteredCards)
      : "<p>No matching cards found.</p>";
  }

  if (collectionResults) {
    collectionResults.innerHTML = filteredCollections.length
      ? displayCollections(filteredCollections)
      : "<p>No matching collections found.</p>";
  }
}

//Display Cards to Page
function displayCards(cards) {
  return cards.map(card => {
    const imageHtml = card.image_url
      ? `<img src="${escapeHTML(card.image_url)}" alt="${escapeHTML(card.image_title || 'Card Image')}" />`
      : '';

    return `
      <div class="card-card" onclick="openCardDetailPage('${card.id}')">
        <h4>${escapeHTML(card.title || 'Untitled')}</h4>
        <h3>Set: ${escapeHTML(card.set || 'Unknown')}</h3>
        <p><strong>Rarity:</strong> ${escapeHTML(card.rarity || 'Unknown')}</p>
        ${imageHtml}
        <p><strong>Price:</strong> $${escapeHTML(card.price || '0.00')}</p>
      </div>
    `;
  }).join('');
}

// Display Collections to Page
function displayCollections(collections) {
  return collections.map(collection => {
    const imageHtml = collection.image_url
      ?`<img src="${escapeHTML(collection.image_url)}" alt="${escapeHTML(collection.image_name || 'Collection Image')}" />`
      : '';

    return `
      <div class="collection-card" onclick="openCollectionDetailPage('${collection.id}')">
        <h4>${escapeHTML(collection.name || 'Untitled')}</h4>
        <p>${escapeHTML(collection.description || 'No Description')}</p>
        ${imageHtml}
      </div>
    `;
  }).join('');
}

// Fetch cards from Database
async function getCardsFromDB() {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
  const cardsWithURLs = data.map(card => {
    if (card.image_path) {
      const { data: imageData } = supabase.storage
        .from('card-images')
        .getPublicUrl(card.image_path);
      card.image_url = imageData.publicUrl;
    }
    return card;
    });
    return cardsWithURLs;
}

// Run on page load
async function displayCardsOnPage() {
  const container = document.getElementById('cardList');
  if (!container) return; // Exit early if not on a card list page

  const cards = await getCardsFromDB();

  const isHomePage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html');
  const cardsToDisplay = isHomePage ? cards.slice(0, 10) : cards;

  container.innerHTML = displayCards(cardsToDisplay);
}



document.addEventListener("DOMContentLoaded", () => {
  displayCardsOnPage();
  loadSearchResults();
})



