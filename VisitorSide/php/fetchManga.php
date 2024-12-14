<?php
include 'dbconn.php';

// Query to fetch data from the mangas table
$query = "SELECT title, author, genre, price, description, image FROM mangas";

// Execute the query
$result = $conn->query($query);

$mangas = [];

if ($result->num_rows > 0) {
    // Fetch the data row by row
    while ($row = $result->fetch_assoc()) {
        $mangas[] = [
            'title' => $row['title'],
            'author' => $row['author'],
            'genre' => $row['genre'],
            'price' => $row['price'],
            'description' => $row['description'],
            'cover' => $row['image'] // Assuming the 'image' field stores the image URL
        ];
    }
}

// Return the manga data as JSON
echo json_encode($mangas);

// Close the database connection
$conn->close();
?>
