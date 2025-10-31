import { supabase } from '../initdb.js';

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

// Load and display a single card's details
async function loadCardDetails() {
  const params = new URLSearchParams(window.location.search);
  const cardId = params.get("id");

  if (!cardId) {
    console.error("No card ID found in URL.");
    return;
  }

  const { data: card, error } = await supabase
    .from('cards')
    .select('*')
    .eq('id', cardId)
    .single();

  if (error || !card) {
    console.error("Error fetching card:", error);
    return;
  }

  // Insert card image into .card-container
  const cardContainer = document.querySelector('.card-container');
  cardContainer.innerHTML = ''; // Clear previous content

  if (card.image_url) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const img = document.createElement('img');
    img.src = card.image_url;
    img.alt = card.title;
    img.classList.add('card-image');

    cardElement.appendChild(img);
    cardContainer.appendChild(cardElement);
  }

  // Insert card details
  document.querySelector('.card-details').innerHTML = `
    <h2>Card Details</h2>
    <p><strong>Name:</strong> ${escapeHTML(card.title)}</p>
    <p><strong>Type:</strong> ${escapeHTML(card.type)}</p>
    <p><strong>Set:</strong> ${escapeHTML(card.set)}</p>
    <p><strong>Rarity:</strong> ${escapeHTML(card.rarity)}</p>
    <p><strong>Description:</strong> ${escapeHTML(card.description)}</p>
  
    <h2>Pricing</h2>
    <p><strong>Condition:</strong>${escapeHTML(card.condition)}</p>
    <p><strong>Price:</strong> $${escapeHTML(card.price)}</p>
    <p><strong>Last Updated:</strong> 2 hours ago</p>
    <p><em>Live data coming soon...</em></p>
  `;

  // Insert seller details
  document.querySelector('.seller-details').innerHTML = `
    <h2>Seller Details</h2>
    <p><strong>Seller:</strong> Buymycards</p>
    <p><strong>Location:</strong> Napier, New Zealand</p>
    <p><strong>Rating:</strong> 8</p>
  `;

}

document.addEventListener("DOMContentLoaded", loadCardDetails);
