<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';
require_once '../controllers/DashboardStats.php';

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? null;

$response = ['success' => false, 'message' => 'Invalid request'];

try {
    switch ($endpoint) {
        case 'getDashboardStats':
            if ($method == "GET") {
                if (!$conn) {
                    $response = ["success" => false, "message" => "Failed to connect to database"];
                } else {
                    $response = DashboardStats::getDashboardStats($conn);
                }
            } else {
                $response = ["success" => false, "message" => "Request method not allowed"];
            }
            break;

        default:
            $response = ['success' => false, 'message' => 'Endpoint not found'];
            break;
    }
} catch (Exception $e) {
    $response = ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
}

echo json_encode($response);
?>