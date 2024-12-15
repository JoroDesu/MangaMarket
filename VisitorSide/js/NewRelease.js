// Function to populate manga boxes
function populateMangaBoxes() {
    const boxContainer = document.querySelector(".box-container");
    boxContainer.innerHTML = ""; // Clear existing content
  
    // Fetch the manga data from the PHP script
    fetch("https://white-seal-771693.hostingersite.com/VisitorSide/php/fetchManga.php") // Change this to the correct path to your PHP file
      .then(response => response.json()) // Parse the JSON response
      .then(mangaData => {
        mangaData.forEach((manga) => {
          const mangaBox = `
          <a href="/VisitorSide/html/Descriptions.html?id=${manga.id}" class="manga-box">
            <img src="${manga.cover}" alt="Manga Cover" class="manga-cover">
            <div class="manga-details">
              <h3 class="manga-title">${manga.title}</h3>
              <p class="manga-author">Author: ${manga.author}</p>
              <p class="manga-genre">Genre: ${manga.genre}</p>
              <p class="manga-price">Price: ${manga.price}</p>
            </div>
          </a>
        `;
          boxContainer.innerHTML += mangaBox;
        });
      })
      .catch(error => {
        console.error('Error fetching manga data:', error);
      });
  }