<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';
require_once '../controllers/DashboardStats.php';
require_once '../utils/JwtLogin.php';

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? null;

$response = ['success' => false, 'message' => 'Invalid request'];
 $data = json_decode(file_get_contents('php://input'), true);
   /*   $token = $data['token'] ?? null;
     if (empty($token)) {
        $response = ["success" => false, "message" => "Token is missing or empty"];
        echo json_encode($response);
        exit;
    }

    $decoded = JwtLogin::verifyJWT($token);

    if ($decoded === null) {
        $response = ["success" => false, "message" => "Invalid or expired token"];
        echo json_encode($response);
        exit;
    }*/

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