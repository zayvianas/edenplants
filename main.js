function peekabo(elementId) {
    var x = document.getElementById(elementId);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }

  function toggleForm() {
    const formContainer = document.getElementById('postFormContainer');
    formContainer.style.display = formContainer.style.display === 'none' || formContainer.style.display === '' ? 'block' : 'none';
}

// Add a new post
function addPost() {
    const form = document.getElementById('postForm');
    const name = form.name.value.trim() || 'Anonymous';
    const message = form.message.value.trim();
    const imageInput = form.image;

    if (!message) {
        alert('Please enter a message!');
        return;
    }

    const post = {
        name,
        message,
        image: imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : null
    };

    // Save post to LocalStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Add post to the page
    displayPost(post);

    // Clear form and hide it
    form.reset();
    document.getElementById('postFormContainer').style.display = 'none';
}

// Display a post on the page
function displayPost(post) {
    const postsContainer = document.getElementById('postsContainer');
    const postDiv = document.createElement('div');
    postDiv.className = 'w3-card w3-round w3-margin w3-padding bg-cream';

    postDiv.innerHTML = `
        <p><b>${post.name}:</b> ${post.message}</p>
    `;

    if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        img.alt = 'Plant Post';
        img.className = 'w3-round w3-image';
        img.style = 'max-width: 100%; height: auto; margin-top: 10px;';
        postDiv.appendChild(img);
    }

    postsContainer.appendChild(postDiv);
}


function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(displayPost);
}


document.addEventListener('DOMContentLoaded', loadPosts);

