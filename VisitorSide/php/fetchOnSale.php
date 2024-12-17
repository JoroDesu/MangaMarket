<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'dbconn.php';

ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_log("Error in manga fetch script.");

$query = "SELECT manga_id, title, author, genre, price, description, image_url, saleprice 
          FROM manga 
          WHERE saleprice IS NOT NULL";

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
            'cover' => $baseURL . $row['image_url'],
            
            'salePrice' => $row['saleprice'] 
        ];
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([]);
    exit();
}

header('Content-Type: application/json');
echo json_encode($mangas);

$conn->close();
?>
