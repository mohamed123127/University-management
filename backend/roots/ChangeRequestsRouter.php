<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/ChangeRequests.php'; // تضمين ملف Etudient
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
                if (isset($data['type']) && isset($data['oldValue']) && isset($data['newValue']) && isset($data['studentId']) ) {
                    $type = $data['type'];
                    $oldValue = $data['oldValue'];
                    $newValue = $data['newValue'];
                    $studentId = $data['studentId'];
                } else {
                    echo json_encode(["success" => false, "message" => "all inputs  are required"]);
                    exit();
                }
                
                if ($type !== '' && $oldValue !== '' && $newValue !== '' && $studentId !== '') {
                    $changeRequest = new ChangeRequests($type,$oldValue,$newValue,$studentId);
                    $response = $changeRequest->add($conn);
                } else {
                    $response = ["success" => false, "message" => "inputs  are vide"];
                }
            } else {
                $response = ["success" => false, "message" => "Invalid method"];
            }
        break;
        case 'getAll':
            if($method == "GET"){
                $response = ChangeRequests::getAll($conn);
            } else {
                $response = ["success" => false, "message" => "Invalid method"];
            }
            break;
        default:
            $response = ['success' => false, 'message' => 'Endpoint not exsist'];
        break;
        case 'updateRequest':
            if($method == "POST"){
                if (isset($data['requestId']) && isset($data['requestType']) && isset($data['newValue']) && isset($data['studentId']) ) {
                    $requestId = $data['requestId'];
                    $type = $data['requestType'];
                    $newValue = $data['newValue'];
                    $studentId = $data['studentId'];
                } else {
                    echo json_encode(["success" => false, "message" => "all inputs  are required"]);
                    exit();
                }
                
                if ($type !== '' && $requestId !== '' && $newValue !== '' && $studentId !== '') {
                    $response = ChangeRequests::updateRequest($conn,$requestId,$type,$newValue,$studentId);
                } else {
                    $response = ["success" => false, "message" => "inputs  are vide"];
                }
            }else{
                $response = ["success" => false, "message" => "Invalid method"];
            }
        break;
    }
}catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}

// إرسال الاستجابة
echo json_encode($response);
?>