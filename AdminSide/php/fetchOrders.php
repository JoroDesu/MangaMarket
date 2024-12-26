<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
require 'dbconn.php'; // Adjust the path to your database connection file

header('Content-Type: application/json');

try {
    // Query to fetch all orders
    $query = "SELECT * FROM orders";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    // Fetch all rows as an associative array
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the data as JSON
    echo json_encode($orders, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    // Handle any errors
    http_response_code(500);
    echo json_encode([
        "error" => "Failed to fetch orders",
        "details" => $e->getMessage()
    ]);
}
?>
