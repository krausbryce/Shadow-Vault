import { supabase } from './initdb.js';

// Escape HTML to prevent injection
function escapeHTML(str) {
  return str?.replace(/[&<>"']/g, function (match) {
    const escape = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return escape[match];
  }) || '';
}

// Load and display a single collection's details
async function loadCollectionDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const collectionId = urlParams.get('id');

    if (!collectionId) {
        console.error("No collection ID found in URL.");
        return;
    }

    const { data: collection, error} = await supabase
        .from('collections')
        .select('*')
        .eq('id', collectionId)
        .single();

    if (error || !collection) {
        console.error("Error fetching collection:", error);
        return;
    }

    // Insert collection image into .collection-container
    const collectionContainer = document.querySelector('.collection-container');
    collectionContainer.innerHTML = ''; //Clear previous content

    if (collection.image_url) {
        const collectionElement = document.createElement('div');
        collectionElement.classList.add('collection');

        const img = document.createElement('img');
        img.src = collection.image_url;
        img.alt = collection.name;
        img.classList.add('collection-image');

        collectionElement.appendChild(img);
        collectionContainer.appendChild(collectionElement);
    }

    // Insert collection details
    document.querySelector('.collection-details').innerHTML = `
        <h2>Collection Details</h2>
        <p><strong>Title:</strong> ${escapeHTML(collection.name)}</p>
        <p><strong>Description:</strong> ${escapeHTML(collection.description)}</p>
        `;
}

// Fetch Cards for a Collection
async function getCardsForCollection(collectionId) {
    const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('collectionId', collectionId)
        .order('title', {ascending: true});

    if (error) {
        console.error('Error fetching cards:', error);
        return [];
    }
    return data;
}

// Display cards for a specific collection
async function displayCards(collectionId) {
    const cards = await getCardsForCollection(collectionId);
    const cardsDiv = document.getElementById(`cards-${collectionId}`);
    cardsDiv.innerHTML = '';

for (const card of cards) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

    cardEl.innerHTML = `
      <div class="card-card" onclick="openCardDetailPage('${card.id}')">
        <h4>${escapeHTML(card.title || 'Untitled')}</h4>
        <h3>Set: ${escapeHTML(card.set || 'Unknown')}</h3>
        <p><strong>Rarity:</strong> ${escapeHTML(card.rarity || 'Unknown')}</p>
        ${imageHtml}
        <p><strong>Price:</strong> $${escapeHTML(card.price || '0.00')}</p>
      </div>
    `;
    cardsDiv.appendChild(cardEl);
}
}
// Initial load
document.addEventListener("DOMContentLoaded", loadCollectionDetails);
document.addEventListener("DOMContentLoaded", displayCards);