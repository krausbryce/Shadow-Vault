import { supabase } from './initdb.js';

// Escape HTML to prevent XSS
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

// Fetch forum posts
async function getForumPostsFromDB() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching forum posts:', error);
    return [];
  }
  return data;
}

// Fetch comments for a post
async function getCommentsForPost(postId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  return data;
}

// Insert a new forum post
async function insertForumPostToDB(user, content) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ user, content }]);

  if (error) {
    console.error('Error inserting forum post:', error);
    return null;
  }
  return data;
}

// Insert a new comment
async function insertCommentToDB(postId, content) {
  const { error } = await supabase
    .from('comments')
    .insert([{ post_id: postId, content }]);

  if (error) {
    console.error('Error inserting comment:', error);
  }
}

// Display all forum posts and their comments
async function displayForumPosts() {
  const posts = await getForumPostsFromDB();
  const container = document.getElementById('forumPostsContainer');

  container.innerHTML = '<h2>Latest Forum Posts</h2>';

  if (posts.length === 0) {
    container.innerHTML += '<p>No forum posts found.</p>';
    return;
  }

  for (const post of posts) {
    const dateObj = new Date(post.created_at);
    const dateStr = (!post.created_at || isNaN(dateObj.getTime())) ? "Unknown date" : dateObj.toLocaleString();

    const postDiv = document.createElement('div');
    postDiv.className = 'forum-post';
    
    postDiv.innerHTML = `
      <strong>${escapeHTML(post.user || 'Anonymous')}</strong>
      <br>
      <p>${escapeHTML(post.content || 'No content')}</p>
      <em>Posted on: ${dateStr}</em>

      <form class="commentForm" data-post-id="${post.id}">
        <input type="text" placeholder="Add a comment" required />
        <button type="submit">Comment</button>
      </form>

      <div class="comments" id="comments-${post.id}">
      </div>
    `;

    container.appendChild(postDiv);
    displayComments(post.id);
  }
}

// Display comments for a specific post
async function displayComments(postId) {
  const comments = await getCommentsForPost(postId);
  const commentsDiv = document.getElementById(`comments-${postId}`);
  commentsDiv.innerHTML = '';


for (const comment of comments) {
  const commentEl = document.createElement('div');
  commentEl.className = 'comment';

  const dateObj = new Date(comment.created_at);
  const dateStr = (!comment.created_at || isNaN(dateObj.getTime())) ? "Unknown date" : dateObj.toLocaleString();

  commentEl.innerHTML = `
    <div class="comment-header">
      <span class="comment-user">${escapeHTML(comment.user || 'Anonymous')}</span>
      <span class="comment-date">${dateStr}</span>
    </div>
    <div class="comment-content">${escapeHTML(comment.content)}</div>
  `;

  commentsDiv.appendChild(commentEl);
}

}

// Handle new forum post submission
document.getElementById('forumForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const user = document.getElementById('forumUser').value.trim();
  const content = document.getElementById('forumContent').value.trim();

  if (!user || !content) {
    alert('Please fill in all fields.');
    return;
  }

  await insertForumPostToDB(user, content);
  alert('Your post has been submitted!');
  document.getElementById('forumForm').reset();
  displayForumPosts();
});

// Handle comment submission
document.addEventListener('submit', async function (e) {
  if (e.target.classList.contains('commentForm')) {
    e.preventDefault();
    const postId = e.target.getAttribute('data-post-id');
    const input = e.target.querySelector('input');
    const content = input.value.trim();

    if (!content) return;

    await insertCommentToDB(postId, content);
    input.value = '';
    displayComments(postId);
  }
});

// Initial load
displayForumPosts();