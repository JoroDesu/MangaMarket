<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); 
}
session_start(); // Start session management

// Include your database connection
include 'dbconn.php';

// Get the email and password from the POST request
$email = $_POST['email'];
$password = $_POST['password'];

// Prepare a query to check if the credentials match
$sql = "SELECT id, email, password FROM credentials WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email); // "s" means one string parameter
$stmt->execute();
$result = $stmt->get_result();

// Check if the email exists
if ($result->num_rows > 0) {
    // Fetch the user record
    $user = $result->fetch_assoc();

    // Verify the hashed password
    if (password_verify($password, $user['password'])) {
        // Start session for the logged-in user
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['email'] = $user['email'];

        echo json_encode(["status" => "success", "message" => "Login successful"]);
    } else {
        // Invalid password
        echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
    }
} else {
    // Email not found
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}

// Close the connection
$stmt->close();
$conn->close();
?>
