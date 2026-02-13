
// fetch function
async function getData() {
  const url = "https://blog-backend-sc5m.onrender.com/blog";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const blogs = await response.json();
    renderBlogs(blogs);
  } catch (error) {
    console.error(error.message);
  }
}

function renderBlogs(blogs) {
  if (!blogs || blogs.length === 0) return;
  // Sort newest first
  blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const grid = document.querySelector(".blog-grid");
  const featured = document.querySelector(".featured-article");

  // --- Render featured (latest) blog ---
  const latest = blogs[0];
  featured.parentElement.href = `/blog.html?id=${latest.id}`;
  featured.querySelector(".featured-title").textContent = latest.title;
  featured.querySelector(".featured-description").textContent = latest.description;
  featured.querySelector(".blog-date").textContent = formatDate(latest.createdAt);
  featured.querySelector(".blog-tag").textContent = `♠ ${latest.mood}`;

  // --- Render archive cards (rest of blogs) ---
  grid.innerHTML = "";
  blogs.slice(1).forEach(blog => {
    const card = document.createElement("a");
    card.href = `/blog.html?id=${blog.id}`;
    card.className = "card-link";
    card.innerHTML = `
      <article class="blog-card">
        <div class="article-header">
          <span class="blog-tag">♠ ${blog.mood}</span>
          <p class="blog-date">${formatDate(blog.createdAt)}</p>
        </div>
        <h2 class="blog-title">${blog.title}</h2>
        <p class="blog-description">${blog.description}</p>
        <div class="dotted-line"></div>
        <p class="read-more">See page 2</p>
      </article>
    `;
    grid.appendChild(card);
  });
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


getData();

// Select the paragraph where date will go
const dateElement = document.getElementById("current-date");

// Create a new Date object
const today = new Date();

// Format the date (example: January 31, 2026)
const formattedDate = today.toLocaleDateString("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

// Insert date into HTML
dateElement.textContent = formattedDate;
