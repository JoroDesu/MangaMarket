document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Here you would typically send the data to your server for processing
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // Optionally, show a success message or redirect the user after registration
    alert("Account created successfully!");

    // Redirect to login page (for demonstration purposes)
    window.location.href = "/VisitorSide/html/Login.html";
});
