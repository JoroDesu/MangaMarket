<?php
// Allow CORS for API access
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

// Start session
session_start();

// Include database connection
include 'dbconn.php';

// Error handler function
function respondWithError($message, $logError = null) {
    if ($logError) {
        error_log($logError, 3, __DIR__ . '/error_log.txt');
    }
    echo json_encode(['error' => $message]);
    exit();
}

// Validate and sanitize genre parameter
$genre = isset($_GET['genre']) ? trim($_GET['genre']) : '';
if (empty($genre)) {
    respondWithError("Genre parameter is missing.");
}

// Query to get manga by genre
$query = "SELECT title, author, price, image_url FROM manga WHERE genre = ?";
$stmt = $mysqli->prepare($query);

if (!$stmt) {
    respondWithError("Failed to prepare query.", $mysqli->error);
}

$stmt->bind_param("s", $genre);

if ($stmt->execute()) {
    $result = $stmt->get_result();
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

    // Save manga data in session
    $_SESSION['mangaList'] = $mangaList;

    // Redirect to View_all.html
    header("Location: /VisitorSide/html/View_all.html");
    exit();
} else {
    respondWithError("Failed to execute query.", $stmt->error);
}

$stmt->close();
?>
