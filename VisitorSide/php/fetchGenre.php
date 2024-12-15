<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include 'dbconn.php';
// Fetch manga from the database based on category
$sql = "SELECT * FROM manga WHERE genre = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $genre);
$stmt->execute();
$result = $stmt->get_result();

// Display manga
if ($result->num_rows > 0) {
    echo '<div class="box-line-container">';
    while ($row = $result->fetch_assoc()) {
        echo '<div class="manga-box">';
        echo '<img src="' . htmlspecialchars($row['cover_image']) . '" alt="Manga Cover" class="manga-cover">';
        echo '<div class="manga-details">';
        echo '<div>';
        echo '<h3 class="manga-title">' . htmlspecialchars($row['title']) . '</h3>';
        echo '<p class="manga-author">' . htmlspecialchars($row['author']) . '</p>';
        echo '</div>';
        echo '<p class="manga-price">₱' . htmlspecialchars($row['price']) . '</p>';
        echo '</div>';
        echo '</div>';
    }
    echo '</div>';
} else {
    echo "<p>No manga found for the selected category.</p>";
}

// Close connection
$conn->close();
?>
