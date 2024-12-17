function getMangaIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')); // Get the ID from the URL
}

function populateOrderSummary() {
    const mangaId = getMangaIdFromURL();

    if (isNaN(mangaId) || mangaId <= 0) {
        console.error('Invalid manga ID');
        return;
    }

    fetch(`https://white-seal-771693.hostingersite.com/VisitorSide/php/fetchMangaId.php?id=${mangaId}`)
        .then(response => response.json())
        .then(manga => {
            if (manga.message) {
                console.error(manga.message);
                return;
            }

            // Populate Order Summary
            document.querySelector(".order-cover").src = manga.cover;
            document.querySelector(".manga-title").textContent = manga.title;
            document.querySelector(".manga-price").textContent = `₱${manga.price}`;

            // Calculate totals
            const mangaPrice = parseFloat(manga.price);
            const shippingCost = 50.00;
            const totalPrice = mangaPrice + shippingCost;

            document.querySelector(".subtotal").textContent = `₱${mangaPrice.toFixed(2)}`;
            document.querySelector(".shipping").textContent = `₱${shippingCost.toFixed(2)}`;
            document.querySelector(".total").textContent = `₱${totalPrice.toFixed(2)}`;

            // Populate hidden fields
            document.getElementById("manga-id").value = mangaId;
            document.getElementById("total-price").value = totalPrice.toFixed(2);
        })
        .catch(error => {
            console.error('Error fetching manga data:', error);
        });
}

window.onload = populateOrderSummary;
