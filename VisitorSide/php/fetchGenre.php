<?php
// Allow CORS for API access
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

// Include database connection
include 'dbconn.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Validate and sanitize genre parameter
$genre = isset($_GET['genre']) ? trim($_GET['genre']) : '';
if (empty($genre)) {
    echo json_encode(['error' => "Genre parameter is missing."]);
    exit();
}

// Add wildcards for partial matching
$genre = "%" . $genre . "%"; // Match any genre containing the user's input

// Query to get manga by genre using LIKE
$query = "SELECT title, author, price, image_url FROM manga WHERE genre LIKE ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(['error' => "Failed to prepare query.", 'details' => $conn->error]);
    exit();
}

$stmt->bind_param("s", $genre);

// Execute query and handle result
if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        echo json_encode(['message' => 'No manga found for this genre.']);
    } else {
        $mangaList = [];
        while ($row = $result->fetch_assoc()) {
            $baseURL = "../../source/mangacover/";
            $mangaList[] = [
                'title' => $row['title'],
                'author' => $row['author'],
                'price' => $row['price'],
                'cover' => $baseURL . $row['image_url']
            ];
        }
        // Return JSON response
        echo json_encode($mangaList);
    }
} else {
    echo json_encode(['error' => "Failed to execute query.", 'details' => $stmt->error]);
}

$stmt->close();
?>
