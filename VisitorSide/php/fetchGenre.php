<?php
// Allow CORS for API access
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

// Handle preflight request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Include database connection
include 'dbconn.php';

// Error handler function
function respondWithError($message) {
    echo json_encode(['error' => $message]);
    exit();
}

$genre = isset($_GET['genre']) ? $_GET['genre'] : '';  // Get the genre from URL parameters

// Prepare the query to get manga by genre
$query = "SELECT title, author, price, image_url FROM manga WHERE genre = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("s", $genre);  // Bind the genre parameter to the query
$stmt->execute();
$result = $stmt->get_result();

$mangaList = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $baseURL = "../../source/mangacover/";
        $mangaList[] = [
            'title' => $row['title'],
            'author' => $row['author'],
            'price' => $row['price'],
            'cover' => $baseURL . $row['image_url']
        ];
    }
    // Return the manga list as JSON
    echo json_encode($mangaList);
} else {
    echo json_encode([]);  // Return an empty array if no manga found
}

$stmt->close();
?>
