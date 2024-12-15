<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");


include 'dbconn.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $title = $conn->real_escape_string($_POST['title']);
    $author = $conn->real_escape_string($_POST['author']);
    $genres = isset($_POST['genre']) ? implode(",", $_POST['genre']) : ''; // Store genres as a comma-separated string
    $price = $conn->real_escape_string($_POST['price']);
    $stock = (int)$_POST['stock']; // Ensure stock is an integer
    $description = $conn->real_escape_string($_POST['description']);

    // Define the upload directory and allowed file types
    $uploadDir = __DIR__ . '/source';
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    $uploadOk = 1;
    $uploadedFileName = '';

    // Check if file was uploaded
if (isset($_FILES["image"]) && $_FILES["image"]["error"] == 0) {
    $fileName = basename($_FILES["image"]["name"]);
    $fileTmpPath = $_FILES["image"]["tmp_name"];
    $fileSize = $_FILES["image"]["size"];
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $uploadedFileName = $fileName; // Use the original file name
    $targetFilePath = $uploadDir . $uploadedFileName;

    // Validate file type
    if (!in_array($fileExt, $allowedExtensions)) {
        echo "Only JPG, JPEG, PNG, and GIF files are allowed.";
        $uploadOk = 0;
    }

    // Validate file size
    if ($fileSize > 500000) { // Max size: 500KB
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Attempt to upload file if all checks pass
    if ($uploadOk == 1) {
        // Create the upload directory if it doesn't exist
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (!move_uploaded_file($fileTmpPath, $targetFilePath)) {
            echo "Sorry, there was an error uploading your file.";
            $uploadOk = 0;
        }
    }
} else {
    echo "No valid file uploaded.";
    $uploadOk = 0;
}


    // Insert data into database if upload is successful
    if ($uploadOk == 1) {
        $stmt = $conn->prepare("INSERT INTO manga (title, author, genre, price, stock, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssiss", $title, $author, $genres, $price, $stock, $description, $uploadedFileName);

        // Execute the query and provide feedback
        if ($stmt->execute()) {
            echo "<script>
                    alert('Manga successfully uploaded with image!');
                    window.location.href = '/AdminSide/html/order-managament.html';
                </script>";
        } else {
            echo "<script>
                    alert('Failed to upload manga. Please try again.');
                    window.location.href = '/AdminSide/html/order-managament.html';
                </script>";
}


        // Close the statement
        $stmt->close();
    }

    // Close the database connection
    $conn->close();
}
?>
