<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';
require_once '../controllers/StudentProblems.php';  
require_once '../utils/JwtLogin.php';

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? null;

$response = ["success" => false, "message" => "Invalid request"];  

try {
    switch($endpoint) {
        case 'add':
            if($method == "POST") {
                $data = json_decode(file_get_contents('php://input'), true);
                
                if (isset($data['studentId']) && isset($data['title']) && isset($data['content'])) {
                    $studentId = $data['studentId'];
                    $Title = $data['title'];
                    $Content = $data['content'];
                    
                    if ($studentId !== '' && $Title !== '' && $Content !== '') {
                        $problem = new StudentsProblems($studentId, $Title, $Content);
                        $response = $problem->add($conn);
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