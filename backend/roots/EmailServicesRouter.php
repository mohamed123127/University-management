<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../utils/WebServices/EmailServices.php'; 
require_once '../utils/JwtLogin.php';

$endpoint = $_GET['endpoint'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
if($method == "POST") $data = json_decode(file_get_contents('php://input'), true);


// استجابة افتراضية
$response = ['success' => false, 'message' => 'Invalid request'];

try{
    switch ($endpoint) {
        case 'checkEmail':
            if ($method === "POST") {
                if (isset($data['email']) && $data['email'] !== '') {
                    $exists = EmailServises::CheckEmail($conn, $data['email']);
                    $response = [
                        'success' => true,
                        'exists' => $exists,
                        'message' => $exists ? 'Email exists' : 'Email does not exist'
                    ];
                } else {
                    $response = ['success' => false, 'message' => 'Email is required'];
                }
            } else {
                $response = ['success' => false, 'message' => 'Invalid method. Use POST.'];
            }
            break;

        case 'sendEmail':
            if ($method === "POST") {
                if (isset($data['emailReceiver']) &&isset($data['title']) && isset($data['content']) && $data['emailReceiver'] !== '' && $data['title'] !== '' && $data['content'] !== '') {
                    $result = EmailServises::SendEmail($data['emailReceiver'], $data['title'], $data['content']);
                    $response = ['success' => true, 'message' => $result];
                } else {
                    $response = ['success' => false, 'message' => 'All email fields are required'];
                }
            } else {
                $response = ['success' => false, 'message' => 'Invalid method. Use POST.'];
            }
            break;

        default:
            $response = ['success' => false, 'message' => 'Endpoint does not exist','dd'=> $endpoint];
            break;
    }

}catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}

// إرسال الاستجابة
echo json_encode($response);
?>