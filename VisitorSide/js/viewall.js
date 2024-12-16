// Function to populate manga data into the container
function populateManga(mangaList) {
    const container = document.getElementById('manga-container'); // Container where manga will be displayed
    container.innerHTML = ''; // Clear any existing content

    mangaList.forEach(manga => {
        const mangaCard = document.createElement('div');
        mangaCard.classList.add('manga-box'); // Add class for styling each manga card
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


// Function to fetch session manga data
function fetchSessionData() {
    fetch('/VisitorSide/php/getSessionData.php')
        .then(response => response.json())
        .then(data => populateManga(data))
        .catch(error => console.error('Error fetching session data:', error));
}

// Automatically call the function to load data on page load
document.addEventListener('DOMContentLoaded', fetchSessionData);
