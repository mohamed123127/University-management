<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';
require_once '../controllers/StudentsProblems.php';  // Add this if it's missing
require_once '../utils/JwtLogin.php';

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? null;

$response = ["success" => false, "message" => "Invalid request"];  // Default response

try {
    switch($endpoint) {
        case 'addProblem':
            if($method == "POST") {
                $data = json_decode(file_get_contents('php://input'), true);
                
                if (isset($data['Sender']) && isset($data['Title']) && isset($data['Content'])) {
                    $Sender = $data['Sender'];
                    $Title = $data['Title'];
                    $Content = $data['Content'];
                    
                    if ($Sender !== '' && $Title !== '' && $Content !== '') {
                        $problem = new StudentsProblems($Sender, $Title, $Content);
                        $problem->addProblem($conn);
                        $response = ["success" => true, "message" => "Problem added successfully"];
                    } else {
                        $response = ["success" => false, "message" => "Data are required"];
                    }
                } else {
                    $response = ["success" => false, "message" => "All inputs are required"];
                }
            } else {
                $response = ["success" => false, "message" => "Invalid method"];
            }
            break;

        case 'getAll':
            $Problems = StudentsProblems::gettall($conn);
            if ($Problems != null) {
                $response = ["success" => true, 'Data' => $Problems];
            } else {
                    $response = ["success" => false, "message" => "it's not exists"];
                }
                break;
        
        default:
            $response = ["success" => false, "message" => "Invalid endpoint"];
            break;
    }
} catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}

// Send the response
echo json_encode($response);
?>