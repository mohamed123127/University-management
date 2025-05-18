<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';
require_once '../controllers/Announcement.php'; 
require_once '../utils/JwtLogin.php';

// احصل على طريقة الطلب (GET, POST, PUT, DELETE)
$endpoint = $_GET['endpoint'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
if($method == "POST") $data = json_decode(file_get_contents('php://input'), true);

// استجابة افتراضية
$response = ['success' => false, 'message' => 'Invalid request'];


try{
    switch($endpoint)
    {
        case 'add' :
            if($method == "POST"){
                // Check if required fields are set in the incoming request
                    if (isset($data['recipient']) && isset($data['title']) && isset($data['content'])) {
                        $recipient = $data['recipient'];
                        $title = $data['title'];
                        $content = $data['content'];
                    } else {
                        $response = ["success" => false, "message" => "Recipient, title, and content are required"];
                        exit();
                    }

                    if ($recipient !== '' && $title !== '') {
                        $announcement = new Announcement($conn, $title, $content);
                        $response = $announcement->add($recipient); 
                    } else {
                        $response = ["success" => false, "message" => "Recipient, title, and content cannot be empty"];
                    }
                } else {
                    $response = ["success" => false, "message" => "Methode Invalide"];
                }
        break;

        default:
        $response = ["success" => false, "message" => "Invalid endpoint"];
        break;
            }
}
catch (Exception $e) {
$response = ['success' => false, 'message' => $e->getMessage()];
}

// إرسال الاستجابة
echo json_encode($response);
?>