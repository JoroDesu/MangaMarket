
// Function to get the manga ID from the URL
function getMangaIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')); // Get the ID from the URL
  }
  
  // Function to populate the manga description page
  function populateMangaDescription() {
    const mangaId = getMangaIdFromURL(); // Get the manga ID from the URL
    const manga = mangaData.find((m) => m.id === mangaId); // Find the manga data based on the ID
  
    if (!manga) {
        console.error("Manga not found!");
        return;
    }
  
    // Populate manga details
    document.querySelector(".manga-title").textContent = manga.title;
    document.querySelector(".manga-author").textContent = `Author: ${manga.author}`;
    document.querySelector(".manga-description-text").textContent = manga.description;
    document.querySelector(".manga-genres").textContent = `Genres: ${manga.genre}`;
    document.querySelector(".manga-price").textContent = `Price: ${manga.price}`;
    document.getElementById("manga-cover").src = manga.cover; // Set manga cover image
  
    // Optional: You can populate the related manga section with the first 5 manga titles or based on some other criteria
    const relatedMangaContainer = document.querySelector(".recommendations");
    relatedMangaContainer.innerHTML = ""; // Clear existing recommendations
  
    // Populate related manga (just a simple example with the first 5 mangas)
    mangaData.slice(0, 5).forEach((relatedManga) => {
        const recommendation = `
            <div class="recommendation">
                <img src="${relatedManga.cover}" alt="${relatedManga.title}" width="113" height="169">
            </div>
        `;
        relatedMangaContainer.innerHTML += recommendation;
    });
  }
  
  // Call the function to populate the manga description when the page loads
  window.onload = populateMangaDescription;
  
  populateMangaDescription();