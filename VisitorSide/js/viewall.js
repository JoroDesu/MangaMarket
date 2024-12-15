function fetchCategory(category) {
    fetch(`https://white-seal-771693.hostingersite.com/VisitorSide/php/fetchGenre.php?category=${genre}`)
        .then(response => response.json())
        .then(data => {
            // Populate the UI with the fetched data
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching category:', error);
        });
}

function fetchCategory(category) {
    fetch(`/fetch-manga.php?genre=${encodeURIComponent(category)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                // Handle the fetched data
                console.log(data);
                // Example: populate your page with the manga data
                populateManga(data);
            }
        })
        .catch(error => {
            console.error('Error fetching category:', error);
        });
}

function populateManga(mangaList) {
    const container = document.getElementById('manga-container'); // Ensure you have a container for displaying manga
    container.innerHTML = ''; // Clear previous results

    mangaList.forEach(manga => {
        const mangaCard = document.createElement('div');
        mangaCard.classList.add('manga-card');
        mangaCard.innerHTML = `
            <h3>${manga.title}</h3>
            <p>${manga.description}</p>
            <img src="${manga.image_url}" alt="${manga.title}">
        `;
        container.appendChild(mangaCard);
    });
}
