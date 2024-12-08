<?php
// Include your database connection
include 'dbconn.php';

// Get the email and password from the POST request
$email = $_POST['email'];
$password = $_POST['password'];

// Prepare a query to check if the credentials match
$sql = "SELECT * FROM credentials WHERE email = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $password); // "ss" means two string parameters
$stmt->execute();
$result = $stmt->get_result();

// Check if any rows match
if ($result->num_rows > 0) {
    // Successful login
    $user = $result->fetch_assoc();
    echo json_encode(["status" => "success", "message" => "Login successful", "user" => $user]);
} else {
    // Invalid credentials
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}

// Close the connection
$stmt->close();
$conn->close();
?>
