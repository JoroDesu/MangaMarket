<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

include 'dbconn.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$genre = isset($_GET['genre']) ? trim($_GET['genre']) : '';
if (empty($genre)) {
    echo json_encode(['error' => "Genre parameter is missing."]);
    exit();
}

$genre = "%" . $genre . "%";

$query = "SELECT manga_id, title, author, price, image_url FROM manga WHERE genre LIKE ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(['error' => "Failed to prepare query.", 'details' => $conn->error]);
    exit();
}

$stmt->bind_param("s", $genre);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        echo json_encode(['message' => 'No manga found for this genre.']);
    } else {
        $mangaList = [];
        while ($row = $result->fetch_assoc()) {
            $baseURL = "../../source/mangacover/";
            $mangaList[] = [
                'id' => $row['manga_id'],
                'title' => $row['title'],
                'author' => $row['author'],
                'price' => $row['price'],
                'cover' => $baseURL . $row['image_url']
            ];
        }
        echo json_encode($mangaList);
    }
} else {
    echo json_encode(['error' => "Failed to execute query.", 'details' => $stmt->error]);
}

$stmt->close();
?>
