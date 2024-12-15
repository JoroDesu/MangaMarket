<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'dbconn.php';

// Query to fetch data from the mangas table where the sale column is not NULL
$query = "SELECT manga_id, title, author, genre, price, description, image_url, sale 
          FROM manga 
          WHERE sale IS NOT NULL";

// Execute the query
$result = $conn->query($query);

$mangas = [];

if ($result && $result->num_rows > 0) {
    // Fetch the data row by row
    while ($row = $result->fetch_assoc()) {
        $baseURL = "../../source/mangacover/";
        $mangas[] = [
            'id' => $row['manga_id'], // Include the manga_id
            'title' => $row['title'],
            'author' => $row['author'],
            'genre' => $row['genre'],
            'price' => $row['price'],
            'description' => $row['description'],
            'cover' => $baseURL . $row['image_url'],
            'sale' => $row['sale'] // Include the sale column
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
