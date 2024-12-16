<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'dbconn.php';



// Get JSON input from the request
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (
    empty($data['firstName']) || 
    empty($data['lastName']) || 
    empty($data['region']) || 
    empty($data['buildingNumber']) || 
    empty($data['streetName']) || 
    empty($data['city']) || 
    empty($data['state']) || 
    empty($data['postalCode']) || 
    empty($data['phoneNumber']) || 
    empty($data['paymentMethod']) || 
    empty($data['mangaId']) || 
    empty($data['price'])
) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Sanitize and prepare the data
$firstName = $conn->real_escape_string($data['firstName']);
$lastName = $conn->real_escape_string($data['lastName']);
$region = $conn->real_escape_string($data['region']);
$buildingNumber = $conn->real_escape_string($data['buildingNumber']);
$streetName = $conn->real_escape_string($data['streetName']);
$city = $conn->real_escape_string($data['city']);
$state = $conn->real_escape_string($data['state']);
$postalCode = $conn->real_escape_string($data['postalCode']);
$phoneNumber = $conn->real_escape_string($data['phoneNumber']);
$paymentMethod = $conn->real_escape_string($data['paymentMethod']);
$mangaId = intval($data['mangaId']);
$price = floatval($data['price']);


// Insert data into the database
$sql = "INSERT INTO orders (first_name, last_name, region, building_number, street_name, city, state, postal_code, phone_number, manga_id, price) 
        VALUES ('$firstName', '$lastName', '$region', '$buildingNumber', '$streetName', '$city', '$state', '$postalCode', '$phoneNumber', '$mangaId', '$price' )";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Order placed successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to place order: ' . $conn->error]);
}

$conn->close();
?>
?>
