const API_URL = 'http://localhost:5000/api';

// --------- Register ---------
const registerForm = document.getElementById('registerForm');
if(registerForm){
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if(result.token){
      localStorage.setItem('token', result.token);
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('msg').innerText = result.message;
    }
  });
}

// --------- Login ---------
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if(result.token){
      localStorage.setItem('token', result.token);
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('msg').innerText = result.message;
    }
  });
}

// --------- Dashboard & Posts ---------
const token = localStorage.getItem('token');
const postForm = document.getElementById('postForm');
const postsDiv = document.getElementById('posts');
const logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });
}

if(postForm){
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(postForm);
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      category: formData.get('category'),
      tags: formData.get('tags').split(',').map(t=>t.trim())
    };

    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if(res.ok) loadPosts();
  });
}

// Load posts
const loadPosts = async () => {
  if(!postsDiv) return;
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();
  postsDiv.innerHTML = posts.map(p => `
    <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
      <h4>${p.title} (${p.category})</h4>
      <p>${p.content}</p>
      <small>By: ${p.author.name} | Tags: ${p.tags.join(', ')}</small>
    </div>
  `).join('');
};
const darkModeBtn = document.getElementById('darkModeBtn');
if(darkModeBtn){
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

loadPosts();
