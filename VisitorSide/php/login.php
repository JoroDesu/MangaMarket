<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); 
}
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'dbconn.php';

$email = $_POST['email'];
$password = $_POST['password'];

// Check for admin credentials
$adminSql = "SELECT admin_id, username, password FROM admin WHERE username = ?";
$adminStmt = $conn->prepare($adminSql);
$adminStmt->bind_param("s", $email);
$adminStmt->execute();
$adminResult = $adminStmt->get_result();

if ($adminResult->num_rows > 0) {
    $admin = $adminResult->fetch_assoc();

    if ($password === $admin['password']) { // Plain comparison for simplicity
        $_SESSION['admin_id'] = $admin['admin_id'];
        $_SESSION['username'] = $admin['username'];

        echo "<script>
                alert('Admin login successful!');
                window.location.href = 'https://mangamarket.store/AdminSide/index.html';
              </script>";
        exit;
    }
}

// Check for regular user credentials
$sql = "SELECT user_id, email, password FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['email'] = $user['email'];

        $userID = $user['user_id']; // Capture the user ID

        echo "<script>
                alert('Login successful!');
                window.location.href = '/VisitorSide/html/Main_Page.html?id={$userID}';
              </script>";
    } else {
        echo "<script>
                alert('Invalid credentials');
                window.location.href = '/VisitorSide/html/Main_Page.html';
              </script>";
    }
} else {
    echo "<script>
            alert('Invalid credentials');
            window.location.href = '/VisitorSide/html/Main_Page.html';
          </script>";
}

$stmt->close();
$adminStmt->close();
$conn->close();

?>
