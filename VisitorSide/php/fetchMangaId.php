<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'dbconn.php';

$manga_id = isset($_GET['id']) ? $_GET['id'] : null;

if ($manga_id === null) {
    echo json_encode(["message" => "manga_id is required."]);
    exit();
}

$query = "SELECT manga_id, title, author, genre, price, description, image_url FROM manga WHERE manga_id = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $manga_id); 
$stmt->execute();
$result = $stmt->get_result();

$manga = [];

if ($result && $result->num_rows > 0) {
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

header('Content-Type: application/json');
echo json_encode($manga);

$stmt->close();
$conn->close();
?>
