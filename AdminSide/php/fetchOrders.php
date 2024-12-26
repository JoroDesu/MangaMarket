<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); 
}

include 'db_connect.php';

$sort = $_GET['sort'] ?? 'newest'; 
$order = ($sort === 'oldest') ? 'ASC' : 'DESC';

// Query to fetch orders with foreign keys and join users and manga tables
$query = "
    SELECT 
        o.order_id AS orderID,
        o.status AS order_status,
        o.delivery_instructions AS delivery_notes,
        o.total_price AS total_price,
        o.created_at AS order_date,
        u.user_id AS userID,
        u.full_name AS user_name,
        u.region AS user_region,
        u.building_number AS user_building,
        u.street_name AS user_street,
        u.city AS user_city,
        u.state AS user_state,
        u.postal_code AS user_postal_code,
        u.phone_number AS user_phone,
        m.manga_id AS mangaID,
        m.title AS manga_title,
        m.author AS manga_author,
        m.genre AS manga_genre,
        m.price AS manga_price
    FROM 
        orders AS o
    JOIN 
        users AS u ON o.user_id = u.user_id
    JOIN 
        manga AS m ON o.manga_id = m.manga_id
    ORDER BY 
        o.created_at $order
";

$result = mysqli_query($connextion, $query);

if (!$result) {
    echo json_encode(['error' => 'Database query failed: ' . mysqli_error($connextion)]);
    exit;
}

$orders = [];
while ($row = mysqli_fetch_assoc($result)) {
    $orders[] = $row;
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($orders);
?>
