<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); 
}

include 'dbconn.php';

$sort = $_GET['sort'] ?? 'newest'; 
$order = ($sort === 'oldest') ? 'ASC' : 'DESC';

// Query to fetch data from the orders table
$query = "
    SELECT 
        order_id, 
        user_id, 
        manga_id, 
        status, 
        full_name, 
        region, 
        building_number, 
        street_name, 
        city, 
        state, 
        postal_code, 
        phone_number, 
        delivery_instructions, 
        total_price
    FROM 
        orders
    ORDER BY 
        created_at $order
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
