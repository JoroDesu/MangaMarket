<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
session_start();

// Destroy the session to log the user out
session_unset();
session_destroy();

// Pass logout status to the frontend
echo json_encode(['success' => true]);
exit;

?>
