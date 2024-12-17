<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'dbconn.php';

$query = "SELECT manga_id, title, author, genre, price, description, image_url FROM manga";

$result = $conn->query($query);

$mangas = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $baseURL = "../../source/mangacover/";
        $mangas[] = [
            'id' => $row['manga_id'], 
            'title' => $row['title'],
            'author' => $row['author'],
            'genre' => $row['genre'],
            'price' => $row['price'],
            'description' => $row['description'],
            'cover' => $baseURL . $row['image_url'] 
        ];
    }
} else {
    echo json_encode(["message" => "No manga found."]);
    exit();
}

header('Content-Type: application/json');
echo json_encode($mangas);

$conn->close();
?>
