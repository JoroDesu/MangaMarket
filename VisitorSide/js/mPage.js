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


