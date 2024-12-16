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

    fetch(`https://white-seal-771693.hostingersite.com/VisitorSide/php/fetchMangaId.php?id=${mangaId}`)
        .then(response => response.json())
        .then(manga => {
            if (manga.message) {
                console.error(manga.message); // Manga not found
                return;
            }

            // Populate manga details on the description page
            document.querySelector(".text-3xl.font-bold.mb-2").textContent = manga.title; // Title
            document.querySelector(".text-xl.text-gray-600.mb-4").textContent = `Author: ${manga.author}`; // Author
            document.querySelector(".text-base.text-gray-800.mb-4").textContent = manga.description; // Description
            document.querySelector(".text-base.text-gray-600.mb-6").textContent = manga.genre; // Genre
            document.getElementById("manga-cover").src = manga.cover; // Set the manga cover image
            document.querySelector(".text-xl.text-red-500").textContent = `₱${manga.price}`;
        })
        .catch(error => {
            console.error('Error fetching manga data:', error);
        });
}

// Call the function to populate the manga description when the page loads
window.onload = populateMangaDescription;

// Select the Buy Now button
const buyNowButton = document.querySelector("a[href='/VisitorSide/html/payment.html']");

// Check if the button exists
if (buyNowButton) {
    // Dynamically set the new href link
    const mangaId = getMangaIdFromURL(); 
    buyNowButton.href = `/VisitorSide/html/payment.html?id=${mangaId}`;
} else {
    console.error("Buy Now button not found!");
}
