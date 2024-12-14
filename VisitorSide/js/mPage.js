const slides = document.getElementById('slides');
  const slideWidth = slides.children[0].offsetWidth; // Assumes all slides have the same width
  const totalSlides = slides.children.length;
  let currentIndex = 0;

  // Function to update the slide position
  function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Automatically move to the next slide
  function autoSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  }

  // Add event listeners for manual navigation
  document.getElementById('prevButton').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
    updateSlidePosition();
    resetAutoSlide(); // Reset the timer after manual navigation
  });

  document.getElementById('nextButton').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
    resetAutoSlide(); // Reset the timer after manual navigation
  });

  // Auto-slide interval
  let autoSlideInterval = setInterval(autoSlide, 3000); // Slide every 3 seconds

  // Reset auto-slide when a manual navigation button is clicked
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 4000);
  }

  document.getElementById("year").textContent = new Date().getFullYear();


  function toggleCategories() {
    // Select all the hidden categories
    const hiddenCategories = document.querySelectorAll('.category-box.hidden');
    
    // Check if categories are currently expanded
    const isExpanded = hiddenCategories.length === 0; // If there are no hidden categories, they are expanded
    
    if (isExpanded) {
        // If categories are expanded, collapse them
        const visibleCategories = document.querySelectorAll('.category-box');
        
        // Hide all categories except the first 8
        visibleCategories.forEach((category, index) => {
            if (index >= 8) {
                category.classList.add('hidden');
            }
        });

        // Change button text to "Expand"
        const button = document.querySelector('.expand-btn');
        button.innerText = 'Expand';
    } else {
        // If categories are collapsed, expand them
        hiddenCategories.forEach(category => {
            category.classList.remove('hidden');
        });

        // Change button text to "Collapse"
        const button = document.querySelector('.expand-btn');
        button.innerText = 'Collapse';
    }
}

// Assuming you have a way to check if the user is logged in, for example:
let isLoggedIn = false;  // This should be set based on session or token validation

// Function to open the registration modal
function openRegisterModal() {
  // Close the login modal if it's open
  const loginModal = document.getElementById("loginModal");
  if (loginModal.style.display === "flex") {
    loginModal.style.display = "none";
  }

  // Open the register modal
  document.getElementById("registerModal").style.display = "flex";
}

// Function to open the login modal and close the register modal if open
function openLoginModal() {
  // Close the register modal if it's open
  const registerModal = document.getElementById("registerModal");
  if (registerModal.style.display === "flex") {
    registerModal.style.display = "none";
  }

  // Open the login modal
  document.getElementById("loginModal").style.display = "flex";
}

// Function to close the login modal
function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

// Function to close the register modal
function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");

  if (event.target == loginModal) {
    closeLoginModal();
  }

  if (event.target == registerModal) {
    closeRegisterModal();
  }
}

// Function to open the cart modal
function openCartModal() {
  if (!isLoggedIn) {
    openLoginModal(); // Show the login modal if the user is not logged in
  } else {
    document.getElementById('cartModal').style.display = 'block'; // Otherwise, show the cart modal
  }
}

// Function to close the cart modal
function closeCartModal() {
  document.getElementById('cartModal').style.display = 'none';
}

// Close modal when clicking outside of the cart modal
window.onclick = function(event) {
  const cartModal = document.getElementById('cartModal');
  if (event.target == cartModal) {
    closeCartModal();
  }
}

// For the "Add to Cart" or "Buy Now" buttons
document.querySelectorAll('.addToCartBtn, .buyNowBtn').forEach(button => {
  button.addEventListener('click', function() {
    if (!isLoggedIn) {
      openLoginModal(); // Show the login modal if not logged in
    } else {
      // Proceed with the action if logged in
      console.log("Proceeding with add to cart or purchase");
    }
  });
});



// JavaScript function to handle the registration form submission
document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting the default way

  var form = new FormData(this); // Get the form data

  fetch('your-php-file.php', {
      method: 'POST',
      body: form
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === "success") {
          // Close the register modal
          document.getElementById('registerModal').style.display = 'none';
          alert(data.message);  // Show success message (optional)
      } else {
          alert(data.message);  // Show error message if registration fails
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred, please try again.');
  });
});






function scrollToLeft() {
  const scroller = document.getElementById('mangaScroller');
  scroller.scrollBy({
    left: -350, // Adjust based on box width + gap
    behavior: 'smooth'
  });
}

function scrollToRight() {
  const scroller = document.getElementById('mangaScroller');
  scroller.scrollBy({
    left: 350, // Adjust based on box width + gap
    behavior: 'smooth'
  });
}

// sale

function scrollToLeftSales() {
  const scroller = document.getElementById('mangaScroller1');
  scroller.scrollBy({
    left: -350, // Adjust based on box width + gap
    behavior: 'smooth'
  });
}

function scrollToRightSales() {
  const scroller = document.getElementById('mangaScroller1');
  scroller.scrollBy({
    left: 350, // Adjust based on box width + gap
    behavior: 'smooth'
  });
}
