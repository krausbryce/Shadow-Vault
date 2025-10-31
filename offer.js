import { supabase } from './initdb.js';

function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

document.addEventListener('DOMContentLoaded', async () => {
  const currentPriceElement = document.getElementById('current-price');

  const Id = getIdFromURL();

  const { data, error } = await supabase
    .from('cards')
    .select('price')
    .eq('id', Id)
    .single();

  if (error) {
    console.error('Error fetching price:', error.message);
    currentPriceElement.textContent = 'Error loading price';
    return;
  }

  const currentPrice = parseFloat(data.price);
  currentPriceElement.dataset.price = currentPrice;
  currentPriceElement.textContent = `$${currentPrice.toFixed(2)}`;
});

//Make an Offer
document.addEventListener('DOMContentLoaded', () => {
  const offerAmountInput = document.getElementById('offer-amount');
  const submitOfferButton = document.getElementById('submit-offer');
  const messageElement = document.getElementById('message');


  submitOfferButton.addEventListener('click', () => {
    const offerAmount = parseFloat(offerAmountInput.value);
    const currentPrice = parseFloat(document.getElementById('current-price').dataset.price);

    if (isNaN(offerAmount) || offerAmount <= 0) {
      messageElement.textContent = 'Please enter a valid offer amount.';
      messageElement.className = 'error';
      return;
    }

    if (offerAmount >= currentPrice) {
      messageElement.textContent = `Your offer of $${offerAmount.toFixed(2)} has been sent!`;
      messageElement.className = 'success';
    } else {
      messageElement.textContent = `Your offer of $${offerAmount.toFixed(2)} is too low. The current price is $${currentPrice.toFixed(2)}.`;
      messageElement.className = 'error';
    }

    // Show the dialog box
    showOfferDialog();
  });
});

function showOfferDialog() {
  document.getElementById('offerDialog').style.display = 'flex';
}


