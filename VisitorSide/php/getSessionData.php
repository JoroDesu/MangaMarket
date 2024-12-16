<?php
// Start session


session_start();

// Check if mangaList is set in the session
if (isset($_SESSION['mangaList'])) {
    // Return the mangaList data as JSON
    echo json_encode($_SESSION['mangaList']);
} else {
    // If mangaList is not found in the session, return an error message
    echo json_encode(['error' => 'No manga data found in the session.']);
}
?>
