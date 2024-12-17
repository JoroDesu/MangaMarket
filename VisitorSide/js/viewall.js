const urlParams = new URLSearchParams(window.location.search);
const genre = urlParams.get('genre');

// Log the genre to the console
console.log('Selected Genre:', genre);

// Update the page title and category name based on the selected genre
document.getElementById('Catitle').textContent = genre;

// Fetch category data from the server based on the genre
fetch(`https://white-seal-771693.hostingersite.com/VisitorSide/php/fetchGenre.php?genre=${genre}`)
    .then(response => response.json())  // Assuming the response is in JSON format
    .then(data => {
        // Log the fetched data to the console
        console.log('Fetched Manga Data:', data);
        
        // Populate the manga data using the populateManga function
        populateManga(data);
    })
    .catch(error => {
        console.error('Error fetching category data:', error);
    });

// Function to populate manga data into the container
function populateManga(mangaList) {
    const container = document.getElementById('manga-container'); // Container where manga will be displayed
    container.innerHTML = ''; // Clear any existing content

    if (mangaList.length === 0) {
        container.innerHTML = '<p>No manga found for this genre.</p>';
        return;
    }

    mangaList.forEach(manga => {
        const mangaCard = document.createElement('a'); // Use an <a> element
        mangaCard.classList.add('manga-box'); // Add class for styling each manga card
        mangaCard.href = `/VisitorSide/html/Descriptions.html?id=${manga.id}`; // Set the destination URL
        mangaCard.innerHTML = `
            <img src="${manga.cover}" alt="${manga.title} Cover" class="manga-cover">
            <div class="manga-details">
                <h3 class="manga-title">${manga.title}</h3>
                <p class="manga-author">${manga.author}</p>
                <p class="manga-price">₱${manga.price}</p>
            </div>
        `;
        container.appendChild(mangaCard);
    });
    
}
