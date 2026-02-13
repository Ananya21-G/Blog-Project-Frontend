const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

async function getData() {
  const url = `https://blog-backend-sc5m.onrender.com/blog/${blogId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const blog = await response.json();
    renderBlog(blog);
  } catch (error) {
    console.error(error.message);
  }
}

function renderBlog(blog) {
  // Title
  document.querySelector(".article-title").textContent = blog.title;

  // Tag and Date
  document.querySelector(".article-tag").textContent = `♠ ${blog.mood}`;
  document.querySelector(".article-date").textContent = new Date(blog.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Body — using innerHTML since content comes as HTML string
  document.querySelector(".article-body").innerHTML = blog.content;

  // Page title in browser tab
  document.title = `${blog.title} - Vintage Vibe Gazette`;
}

// Current date in header
const dateElement = document.getElementById("current-date");
dateElement.textContent = new Date().toLocaleDateString("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

getData();