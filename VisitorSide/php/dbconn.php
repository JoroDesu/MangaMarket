<?php

$servername = "localhost";
$username = "u143688490_joro";
$password = "GaeAF123!";
$dbname = "u143688490_mangaDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
