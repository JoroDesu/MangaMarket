document.querySelector('#login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting normally
  
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
  
    // Send a POST request to the PHP backend
    fetch('https://mangamarket.store/VisitorSide/php/login.php', {
      method: 'POST',
      body: new URLSearchParams({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        // Redirect the user to another page or display a success message
        alert(data.message);
        // You could also store session data here or redirect to a dashboard
      } else {
        // Show error message
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  });
  