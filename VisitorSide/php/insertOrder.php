<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'dbconn.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') { 
    // Sanitize and validate POST data
    $firstName = $conn->real_escape_string($_POST['firstName']);
    $lastName = $conn->real_escape_string($_POST['lastName']);
    $region = $conn->real_escape_string($_POST['region']);
    $buildingNumber = $conn->real_escape_string($_POST['buildingNumber']);
    $streetName = $conn->real_escape_string($_POST['streetName']);
    $city = $conn->real_escape_string($_POST['city']);
    $state = $conn->real_escape_string($_POST['state']);
    $postalCode = $conn->real_escape_string($_POST['postalCode']);
    $phoneNumber = $conn->real_escape_string($_POST['phoneNumber']);
    $mangaId = intval($_POST['mangaId']);
    $price = floatval($_POST['price']);

    if (
        empty($firstName) || empty($lastName) || empty($region) ||
        empty($buildingNumber) || empty($streetName) || empty($city) ||
        empty($state) || empty($postalCode) || empty($phoneNumber) ||
        empty($mangaId) || empty($price)
    ) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }

    // Insert into database
    $sql = "INSERT INTO orders (first_name, last_name, region, building_number, street_name, city, state, postal_code, phone_number, manga_id, price) 
            VALUES ('$firstName', '$lastName', '$region', '$buildingNumber', '$streetName', '$city', '$state', '$postalCode', '$phoneNumber', '$mangaId', '$price')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Order placed successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
