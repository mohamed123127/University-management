<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; 
require_once '../controllers/Notification.php';
require_once '../utils/JwtLogin.php';

$endpoint = $_GET['endpoint'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
if($method == "POST") $data = json_decode(file_get_contents('php://input'), true);

// استجابة افتراضية
$response = ['success' => false, 'message' => 'Invalid request'];

try{
    switch($endpoint)
    {
        case 'getByStudentId':
            if($method =="GET")
            {
                if (isset($_GET['studentId'])) 
                {
                    $studentId = $_GET['studentId'];
                } else 
                {
                    $response = ["success" => false, "message" => "student id is required"];
                    echo json_encode($response);
                    exit();
                }

                if ($studentId !== '') {
                    $response = Notification::getByStudentId($conn, $studentId);
                } else {
                    $response = ["success" => false, "message" => "student id is required"];
                }
            }else
            {
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        case 'setNotificationAsRead':
            if($method =="GET")
            {
                if (isset($_GET['studentId'])) 
                {
                    $studentId = $_GET['studentId'];
                } else 
                {
                    $response = ["success" => false, "message" => "student id is required"];
                    echo json_encode($response);
                    exit();
                }

                if ($studentId !== '') {
                    $response = Notification::setNotificationAsRead($conn, $studentId);
                } else {
                    $response = ["success" => false, "message" => "student id is required"];
                }
            }else
            {
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        default:
            $response = ["success" => false, "message" => "Invalid endpoint"];
            break;
        
    }
}catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}

// إرسال الاستجابة
echo json_encode($response);
?>