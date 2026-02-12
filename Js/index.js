
// fetch function
async function getData() {
  const url = "http://localhost:8080/blog";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
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
