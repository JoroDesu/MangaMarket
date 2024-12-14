


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
          <a href="/VisitorSide/html/Descriptions.html" class="manga-box">
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

fetch('https://white-seal-771693.hostingersite.com/VisitorSide/php/fetchManga.php') // Replace with the actual API endpoint
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        data.forEach((manga) => {
            // Create an image element to test the image retrieval
            const img = new Image();
            img.src = manga.cover;

            img.onload = () => {
                console.log(`Image for "${manga.title}" successfully retrieved: ${manga.cover}`);
            };

            img.onerror = () => {
                console.error(`Failed to retrieve image for "${manga.title}": ${manga.cover}`);
            };
        });
    })
    .catch((error) => {
        console.error('Error fetching manga data:', error);
    });


function populateMangaBoxesSales() {
  const boxContainer = document.querySelector(".box-container1");
  boxContainer.innerHTML = ""; // Clear existing content

  mangaDataSales.forEach((manga) => {
    const mangaBox = `
      <a href="/VisitorSide/html/Descriptions.html" class="manga-box">
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
}

// Call the function to populate on page load
populateMangaBoxes();
populateMangaBoxesSales();

// Function for the "View Details" button
function viewMangaDetails(title) {
  alert(`View details for: ${title}`);
}

