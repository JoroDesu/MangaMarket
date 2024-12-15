


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

    function populateOnSaleBoxes() {
      const boxContainer = document.querySelector("#saleScroller");
      boxContainer.innerHTML = ""; // Clear existing content
    
      fetch("https://white-seal-771693.hostingersite.com/VisitorSide/php/fetchOnSale.php")
        .then(response => response.json())
        .then(onSaleData => {
          onSaleData.forEach((manga) => {
            const mangaBox = `
            <a href="/VisitorSide/html/Descriptions.html?id=${manga.id}" class="manga-box">
              <img src="${manga.cover}" alt="Manga Cover" class="manga-cover">
              <div class="manga-details">
                <h3 class="manga-title">${manga.title}</h3>
                <p class="manga-author">Author: ${manga.author}</p>
                <p class="manga-genre">Genre: ${manga.genre}</p>
                <p class="manga-price">
                  <span class="original-price">${manga.originalPrice}</span>
                  <span class="discounted-price">${manga.salePrice}</span>
                </p>
              </div>
            </a>
          `;
            boxContainer.innerHTML += mangaBox;
          });
        })
        .catch(error => {
          console.error('Error fetching on sale data:', error);
        });
    }
    
    function populateNewReleaseBoxes() {
      const boxContainer = document.querySelector("#releaseScroller");
      boxContainer.innerHTML = ""; // Clear existing content
    
      fetch("https://white-seal-771693.hostingersite.com/VisitorSide/php/fetchManga.php")
        .then(response => response.json())
        .then(newReleaseData => {
          newReleaseData.forEach((manga) => {
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
          console.error('Error fetching new release data:', error);
        });
    }
   

// Call the function to populate on page load
populateMangaBoxes();
 populateOnSaleBoxes();
  populateNewReleaseBoxes();


// Function for the "View Details" button
function viewMangaDetails(title) {
  alert(`View details for: ${title}`);
}

// Function to get the manga ID from the URL
function getMangaIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id')); // Get the ID from the URL
}

// Fetch the manga data from the PHP script based on the ID
function populateMangaDescription() {
  const mangaId = getMangaIdFromURL(); // Get the manga ID from the URL

  if (isNaN(mangaId) || mangaId <= 0) {
      console.error('Invalid manga ID');
      return;
  }

  fetch(`https://white-seal-771693.hostingersite.com/VisitorSide/php/fetchManga.php?id=${mangaId}`)
      .then(response => response.json())
      .then(manga => {
          if (manga.message) {
              console.error(manga.message); // Manga not found
              return;
          }

          // Populate manga details on the description page
          document.querySelector(".manga-title").textContent = manga.title;
          document.querySelector(".manga-author").textContent = `Author: ${manga.author}`;
          document.querySelector(".manga-description-text").textContent = manga.description;
          document.querySelector(".manga-genres").textContent = `Genre: ${manga.genre}`;
          document.getElementById("manga-cover").src = manga.cover; // Set the manga cover image
      })
      .catch(error => {
          console.error('Error fetching manga data:', error);
      });
}

// Call the function to populate the manga description when the page loads
window.onload = populateMangaDescription;
