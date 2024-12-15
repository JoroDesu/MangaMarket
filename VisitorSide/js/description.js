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
