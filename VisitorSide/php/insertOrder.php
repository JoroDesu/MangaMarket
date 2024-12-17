<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'dbconn.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


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

$userId = $_POST['userId'];

$sql = "INSERT INTO orders (user_id, manga_id, full_name, region, building_number, street_name, city, state, postal_code, phone_number, delivery_instructions, total_price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iisssssssssd", $userId, $mangaId, $fullName, $region, $buildingNumber, $streetName, $city, $state, $postalCode, $phoneNumber, $deliveryInstructions, $totalPrice);

if ($stmt->execute()) {
    echo "<script>
            alert('Order Successful');
            window.location.href = '/VisitorSide/html/Main_Page.html';
        </script>";
} else {
    echo "<script>
            alert('Order Failed. Please try again.');
            window.location.href = '/VisitorSide/html/Main_Page.html';
        </script>";
}

$stmt->close();
$conn->close();
?>
