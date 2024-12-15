<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); 
}

include 'dbconn.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $title = $_POST['title'];
    $author = $_POST['author'];
    $genres = isset($_POST['genre']) ? implode(",", $_POST['genre']) : ''; // Store genres as comma-separated string
    $price = $_POST['price'];
    $stock = (int)$_POST['stock']; // Ensure stock is an integer
    $description = $_POST['description'];

    // Prepare and bind SQL statement
    $stmt = $conn->prepare("INSERT INTO manga (title, author, genre, price, stock, description) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssis", $title, $author, $genres, $price, $stock, $description);

    // Execute the query and set flag for success
    $success = $stmt->execute();

    // Close the statement
    $stmt->close();

    // Provide user feedback
    if ($success) {
        echo "Manga successfully uploaded!";
    } else {
        echo "Failed to upload manga. Please try again.";
    }

    // Close the database connection
    $conn->close();
}
?>
