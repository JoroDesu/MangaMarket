<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'dbconn.php';


// Retrieve Form Data
$fullName = $_POST['firstName'] . ' ' . $_POST['lastName'];
$region = $_POST['region'];
$buildingNumber = $_POST['buildingNumber'];
$streetName = $_POST['streetName'];
$city = $_POST['city'];
$state = $_POST['state'];
$postalCode = $_POST['postalCode'];
$phoneNumber = $_POST['phoneNumber'];
$mangaId = $_POST['mangaId'];
$totalPrice = $_POST['price'];
$deliveryInstructions = isset($_POST['deliveryInstructions']) ? $_POST['deliveryInstructions'] : "";

// Assuming a default user_id for now (replace this with actual user ID logic)
$userId = $_POST['mangaId'];

// SQL Query to Insert Data
$sql = "INSERT INTO orders (user_id, manga_id, full_name, region, building_number, street_name, city, state, postal_code, phone_number, delivery_instructions, total_price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Prepare and Bind
$stmt = $conn->prepare($sql);
$stmt->bind_param("iisssssssssd", $userId, $mangaId, $fullName, $region, $buildingNumber, $streetName, $city, $state, $postalCode, $phoneNumber, $deliveryInstructions, $totalPrice);

// Execute Query
if ($stmt->execute()) {
    echo "Order placed successfully!";
} else {
    echo "Error: " . $stmt->error;
}

// Close Connections
$stmt->close();
$conn->close();
?>
