document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const genres = document.querySelectorAll('input[name="genre[]"]');
    const priceInput = document.querySelector('#price');
  
    form.addEventListener('submit', function (event) {
      // Prevent the default form submission
      event.preventDefault();
  
      // Validate the form
      const title = document.querySelector('#manga-title').value.trim();
      const author = document.querySelector('#author').value.trim();
      const description = document.querySelector('#description').value.trim();
      const price = parseFloat(priceInput.value.trim());
      let genreSelected = false;
  
      // Check if at least one genre is selected
      genres.forEach(genre => {
        if (genre.checked) {
          genreSelected = true;
        }
      });
  
      // Validation messages
      if (!title) {
        alert('Please enter the manga title.');
        return;
      }
  
      if (!author) {
        alert('Please enter the author\'s name.');
        return;
      }
  
      if (!genreSelected) {
        alert('Please select at least one genre.');
        return;
      }
  
      if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price greater than 0.');
        return;
      }
  
      if (!description) {
        alert('Please enter a description.');
        return;
      }
  
      // If validation passes, simulate form submission
      alert('Form submitted successfully!');
  
      // If needed, submit the form programmatically
      // form.submit();
    });
  });
  