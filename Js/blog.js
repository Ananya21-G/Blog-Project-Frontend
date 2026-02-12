const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");
async function getData() {
  const url = `http://localhost:8080/blog/${blogId}`;
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

    console.log(blogId);

getData();
