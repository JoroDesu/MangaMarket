// Function to get the manga ID from the URL
function getMangaIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')); // Get the ID from the URL
}

// Fetch the manga data and update the Order Summary
function populateOrderSummary() {
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

            // Update Order Summary with fetched manga details
            const orderItem = document.querySelector(".order-item");
            orderItem.querySelector(".order-cover").src = manga.cover; // Manga Cover
            orderItem.querySelector(".manga-title").textContent = manga.title; // Manga Title
            orderItem.querySelector(".manga-price").textContent = `₱${manga.price}`; // Manga Price

            // Update Summary Totals
            const subtotalElement = document.querySelector(".subtotal");
            const shippingElement = document.querySelector(".shipping");
            const totalElement = document.querySelector(".total");

            const mangaPrice = parseFloat(manga.price); // Price from fetched manga
            const shippingCost = 50.00; // Example shipping cost

            subtotalElement.textContent = `₱${mangaPrice.toFixed(2)}`;
            shippingElement.textContent = `₱${shippingCost.toFixed(2)}`;
            totalElement.textContent = `₱${(mangaPrice + shippingCost).toFixed(2)}`;
        })
        .catch(error => {
            console.error('Error fetching manga data:', error);
        });
}

// Call the function to populate the order summary when the page loads
window.onload = populateOrderSummary;


// Function to handle form submission
document.querySelector(".pay-now-button").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        region: document.getElementById("region").value,
        buildingNumber: document.getElementById("building-number").value,
        streetName: document.getElementById("street-name").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        postalCode: document.getElementById("postal-code").value,
        phoneNumber: document.getElementById("phone-number").value,
       
        mangaId: new URLSearchParams(window.location.search).get('id'), // Extract manga ID from the URL
        price: document.querySelector(".total").textContent.replace("₱", "").trim(), // Get the total price
    };
    console.log(formData);
   

    // Send data to PHP via POST request
    fetch("https://white-seal-771693.hostingersite.com/VisitorSide/php/payment.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send data as JSON
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                alert("Order placed successfully!");
                window.location.href = "https://white-seal-771693.hostingersite.com/VisitorSide/html/Main_Page.html"
            } else {
                console.error(result.message);
                alert("Failed to place the order. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error submitting order:", error);
            alert("An error occurred. Please try again.");
        });
});
