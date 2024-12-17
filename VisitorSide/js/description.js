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








function addToCart(mangaId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(mangaId)) {
        cart.push(mangaId);  // Add mangaId to cart
        localStorage.setItem('cart', JSON.stringify(cart));  // Save updated cart to localStorage
    }
}

// Example usage for the button
document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
    const mangaId = 123;  // Replace with actual mangaId
    addToCart(mangaId);
});



function openCartModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemList = document.getElementById('cartItemListPanel');
    cartItemList.innerHTML = '';  // Clear existing items
    
    cart.forEach(mangaId => {
        // Fetch manga details (e.g., title, image, price) based on the mangaId
        const manga = getMangaDetails(mangaId); // You need a function to get the manga details from your data
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');
        
        listItem.innerHTML = `
            <img src="${manga.cover}" alt="Manga Cover" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${manga.title}</h3>
                <p class="cart-item-price">Price: $${manga.price}</p>
                <p class="cart-item-quantity">Quantity: 1</p> <!-- Adjust quantity if necessary -->
            </div>
        `;
        
        cartItemList.appendChild(listItem);
    });

    // Show modal
    document.getElementById('cartModalPanel').classList.remove('hidden');
}

function getMangaDetails(mangaId) {
    // You need to implement this function to return manga details based on the mangaId.
    // For example, you might have an array of manga objects where each object contains
    // an id, title, cover, and price.
    const mangaData = {
        123: { title: 'Manga Title', cover: '../source/Horimiya.600.3183213.jpg', price: 19.99 },
        // Add other manga details here...
    };

    return mangaData[mangaId];
}




function redirectToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemIds = cart.join(',');  // Convert array to a comma-separated string
    const checkoutUrl = `/VisitorSide/html/payment.html?cart=${cartItemIds}`;

    window.location.href = checkoutUrl;
}

// Attach the function to the checkout button
document.querySelector('.cart-checkout-button').addEventListener('click', redirectToCheckout);



function getCartFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const cartItemIds = urlParams.get('cart');  // 'cart' is the parameter name

    if (cartItemIds) {
        const mangaIds = cartItemIds.split(',');  // Convert the comma-separated string back to an array
        console.log('Manga IDs in cart:', mangaIds);
        
        // Now you can use the manga IDs to fetch details and display them in the checkout page.
    }
}

getCartFromUrl();
