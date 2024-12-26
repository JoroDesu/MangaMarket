<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
include "dbconn.php";

// Define the query to fetch manga data
$sql = "SELECT manga_id, title, author, genre, price, stock, description, image_url, saleprice, ratings, created_at FROM manga";

// Execute the query
$result = $conn->query($sql);

// Check if results are available
if ($result->num_rows > 0) {
    $mangas = [];
    
    // Fetch each row and store it in an array
    while ($row = $result->fetch_assoc()) {
        $mangas[] = $row;
    }
    
    // Return data as JSON
    echo json_encode($mangas);
} else {
    // If no data found, return an error message
    echo json_encode(['error' => 'No mangas found.']);
}

// Close connection
$conn->close();
?>
