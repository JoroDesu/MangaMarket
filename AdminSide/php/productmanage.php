<?php
include 'dbconn.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $title = $_POST['title'];
    $author = $_POST['author'];
    $genres = isset($_POST['genre']) ? implode(",", $_POST['genre']) : ''; // Store genres as comma-separated string
    $price = $_POST['price'];
    $description = $_POST['description'];

    // Handle image upload
    $image = $_FILES['image'];
    $imageName = $image['name'];
    $imageTmpName = $image['tmp_name'];
    $imageSize = $image['size'];
    $imageError = $image['error'];

    // Set the absolute target directory for images
    $targetDir = "C:/xampp1/htdocs/MangaMarket/source/mangacover/";
    $targetFile = $targetDir . basename($imageName);

    // Ensure the directory exists
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }

    // Check if the image file is a valid image
    $validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    if (in_array($imageFileType, $validExtensions) && $imageSize < 5000000 && $imageError === 0) {
        if (move_uploaded_file($imageTmpName, $targetFile)) {
            // Prepare and bind SQL statement
            $stmt = $conn->prepare("INSERT INTO mangas (title, author, genre, price, description, image) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssss", $title, $author, $genres, $price, $description, $targetFile);

            // Execute the query and set flag for success
            if ($stmt->execute()) {
                $success = true;
            } else {
                $success = false;
            }

            // Close the statement
            $stmt->close();
        } else {
            $success = false;
        }
    } else {
        $success = false;
    }

    // Close the database connection
    $conn->close();
}
?>
