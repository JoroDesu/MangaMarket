<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'dbconn.php';

// Get manga_id from the query string
$manga_id = isset($_GET['id']) ? $_GET['id'] : null;


// If manga_id is not provided, return an error
if ($manga_id === null) {
    echo json_encode(["message" => "manga_id is required."]);
    exit();
}

// Query to fetch data from the mangas table for the specific manga_id
$query = "SELECT manga_id, title, author, genre, price, description, image_url FROM manga WHERE manga_id = ?";

// Prepare and execute the query
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $manga_id); // Bind manga_id as integer
$stmt->execute();
$result = $stmt->get_result();

$manga = [];

if ($result && $result->num_rows > 0) {
    // Fetch the row
    $row = $result->fetch_assoc();
    $baseURL = "../../source/mangacover/";
    $manga = [
        'id' => $row['manga_id'],
        'title' => $row['title'],
        'author' => $row['author'],
        'genre' => $row['genre'],
        'price' => $row['price'],
        'description' => $row['description'],
        'cover' => $baseURL . $row['image_url']
    ];
} else {
    echo json_encode(["message" => "No manga found for this ID."]);
    exit();
}

// Return the manga data as JSON
header('Content-Type: application/json');
echo json_encode($manga);

// Close the database connection
$stmt->close();
$conn->close();
?>
