// Placeholder data for manga
const mangaData = [
  {
    title: "Manga Title 1",
    author: "Author Name 1",
    genre: "Adventure",
    price: "$19.99",
    cover: "../source/583649164431305.63f68280e2b51.jpg",
  },
  {
    title: "Manga Title 2",
    author: "Author Name 2",
    genre: "Fantasy",
    price: "$15.99",
    cover: "../source/Horimiya.600.3183213.jpg",
  },
  {
    title: "Manga Title 3",
    author: "Author Name 3",
    genre: "Fantasy",
    price: "$15.99",
    cover: "../source/583649164431305.63f68280e2b51.jpg",
  },
  {
    title: "Manga Title 3",
    author: "Author Name 3",
    genre: "Fantasy",
    price: "$15.99",
    cover: "../source/583649164431305.63f68280e2b51.jpg",
  },

];

// Function to populate manga boxes
function populateMangaBoxes() {
  const boxContainer = document.querySelector(".box-container");
  boxContainer.innerHTML = ""; // Clear existing content

  mangaData.forEach((manga) => {
    const mangaBox = `
      <div class="manga-box">
        <img src="${manga.cover}" alt="Manga Cover" class="manga-cover">
        <div class="manga-details">
          <h3 class="manga-title">${manga.title}</h3>
          <p class="manga-author">Author: ${manga.author}</p>
          <p class="manga-genre">Genre: ${manga.genre}</p>
          <p class="manga-price">Price: ${manga.price}</p>
          <button class="view-button" onclick="viewMangaDetails('${manga.title}')">View Details</button>
        </div>
      </div>
    `;
    boxContainer.innerHTML += mangaBox;
  });
}

// Call the function to populate on page load
populateMangaBoxes();

// Function for the "View Details" button
function viewMangaDetails(title) {
  alert(`View details for: ${title}`);
}
