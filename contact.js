// Import Supabase library and setup connection to database
import { supabase } from './initdb.js';

// Avoid errors
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

// Fetch messages from the database
async function getMessageFromDB() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  console.log('Fetched messages:', data);
  return data;
}

// Display messages on the page
async function displayMessages() {
  let messages = await getMessageFromDB();
  let container = document.getElementById('messagesContainer');

  if (messages.length === 0) {
    container.innerHTML = '<p>No messages found.</p>';
    return;
  }

  container.innerHTML = messages.map(msg => {
    let dateObj = new Date(msg.created_at);
    let dateStr = (!msg.created_at || isNaN(dateObj.getTime())) ? "Unknown date" : dateObj.toLocaleString();
    return `
      <div class="message">
        <strong>${escapeHTML(msg.name || 'Anonymous')} (${escapeHTML(msg.email || 'No email provided')}):</strong><br>
        <span>Message: <br>${escapeHTML(msg.message || 'No message provided')}</span><br>
        <br>
        <em>Date Sent: <br>${dateStr}</em>
      </div>
    `;
  }).join('');
}

displayMessages();

// Insert message into the database
async function insertMessageToDB(name, email, message) {
  let {data, error } = await supabase
    .from('messages')
    .insert([{name, email, message }]);

  if (error) {
    console.error('Error inserting message:', error);
    return null;
  }
  return data;
}

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  let name = document.getElementById('name').value.trim();
  let email = document.getElementById('email').value.trim();
  let message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    document.getElementById('notification').textContent = 'Please fill in all fields.';
    document.getElementById('dialogContainer').showModal();
    return;
  }

  await insertMessageToDB(name, email, message);
  document.getElementById('notification').textContent = 'Your message has been sent!';
  document.getElementById('dialogContainer').showModal();
  document.getElementById('contactForm').reset();
  displayMessages();

});




