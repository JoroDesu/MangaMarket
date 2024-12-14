<?php
include 'dbconn.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $title = $_POST['title'];
    $author = $_POST['author'];
    $genres = isset($_POST['genre']) ? implode(",", $_POST['genre']) : ''; // Store genres as comma-separated string
    $price = $_POST['price'];
    $stock = (int)$_POST['stock']; // Ensure stock is an integer
    $description = $_POST['description'];

    // Handle image upload
    $image = $_FILES['image'];
    $imageName = $image['name'];
    $imageTmpName = $image['tmp_name'];
    $imageSize = $image['size'];
    $imageError = $image['error'];

    // Set the target directory for images (server path)
    $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/MangaMarket/source/mangacover/";
    $imageURL = "https://white-seal-771693.hostingersite.com/MangaMarket/source/mangacover/" . basename($imageName);

    // Ensure the directory exists
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }

    // Check if the image file is valid
    $validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    $imageFileType = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));
    if (getimagesize($imageTmpName) !== false && in_array($imageFileType, $validExtensions) && $imageSize < 5000000 && $imageError === 0) {
        if (move_uploaded_file($imageTmpName, $targetDir . basename($imageName))) {
            // Prepare and bind SQL statement
            $stmt = $conn->prepare("INSERT INTO manga (title, author, genre, price, stock, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssiss", $title, $author, $genres, $price, $stock, $description, $imageURL);

            // Execute the query and set flag for success
            $success = $stmt->execute();

            // Close the statement
            $stmt->close();
        } else {
            $success = false;
        }
    } else {
        $success = false;
    }

    // Provide user feedback
    if ($success) {
        echo "Manga successfully uploaded!";
    } else {
        echo "Failed to upload manga. Please try again.";
    }

    // Close the database connection
    $conn->close();
}
?>
