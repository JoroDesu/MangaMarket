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
function respondWithError($message, $logError = null) {
    // Log the error to a file (optional)
    if ($logError) {
        error_log($logError, 3, __DIR__ . '/error_log.txt');
    }

    // Respond with an error message
    echo json_encode(['error' => $message]);
    exit();
}

// Validate and sanitize genre parameter
$genre = isset($_GET['genre']) ? trim($_GET['genre']) : '';

if (empty($genre)) {
    respondWithError("Genre parameter is missing.");
}

// Prepare the query to get manga by genre
$query = "SELECT title, author, price, image_url FROM manga WHERE genre = ?";
$stmt = $mysqli->prepare($query);

if (!$stmt) {
    respondWithError("Failed to prepare query.", $mysqli->error);
}

$stmt->bind_param("s", $genre);

// Execute the query
if ($stmt->execute()) {
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

        // Save the result in a session to use in the next page
        session_start();
        $_SESSION['mangaList'] = $mangaList;

        // Redirect to View_all.html
        header("Location: /VisitorSide/html/View_all.html");
        exit();
    } else {
        // If no manga found, redirect with an empty session variable
        session_start();
        $_SESSION['mangaList'] = [];
        header("Location: /VisitorSide/html/View_all.html");
        exit();
    }
} else {
    respondWithError("Failed to execute query.", $stmt->error);
}

$stmt->close();
?>
