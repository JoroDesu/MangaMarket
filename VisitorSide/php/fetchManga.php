<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'dbconn.php';

// Query to fetch data from the mangas table
$query = "SELECT title, author, genre, price, description, image_url FROM manga";

// Execute the query
$result = $conn->query($query);

$mangas = [];

if ($result && $result->num_rows > 0) {
    // Fetch the data row by row
    while ($row = $result->fetch_assoc()) {
        $mangas[] = [
            'title' => $row['title'],
            'author' => $row['author'],
            'genre' => $row['genre'],
            'price' => $row['price'],
            'description' => $row['description'],
            'cover' => $row['image_url'] // Use the 'image_path' field for the cover image URL
        ];
    }
} else {
    echo json_encode(["message" => "No manga found."]);
    exit();
}

// Return the manga data as JSON
header('Content-Type: application/json');
echo json_encode($mangas);

// Close the database connection
$conn->close();
?>
