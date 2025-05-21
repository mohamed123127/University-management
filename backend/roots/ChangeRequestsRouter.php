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
 $data = json_decode(file_get_contents('php://input'), true);
  /*    $token = $data['token'] ?? null;
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
    }
*/
// استجابة افتراضية
$response = ['success' => false, 'message' => 'Invalid request'];

try{
    
    switch($endpoint)
    {
        case 'simpleAdd':
            if ($method == "POST") {
                if (
                    isset($data['type']) &&
                    isset($data['oldValue']) &&
                    isset($data['newValue']) &&
                    isset($data['studentId'])
                ) {
                    $type = $data['type'];
                    $oldValue = $data['oldValue'];
                    $newValue = $data['newValue'];
                    $studentId = $data['studentId'];
                } else {
                    echo json_encode(["success" => false, "message" => "all inputs are required"]);
                    exit();
                }
        
                if ($type !== '' && $oldValue !== '' && $newValue !== '' && $studentId !== '') {
                    $changeRequest = new ChangeRequests($type, $newValue1, $newValue2, $studentId, $matricule1, $matricule2); 
                    $response = $changeRequest->add($conn);
                } else {
                    $response = ["success" => false, "message" => "inputs are empty"];
                }
            } else {
                $response = ["success" => false, "message" => "Invalid method"];
            }
            break;
        case 'add':
            if ($method == "POST") {
                if (
                    isset($data['type']) &&
                    isset($data['newValue1']) &&
                    isset($data['newValue2']) &&
                    isset($data['studentId']) &&
                    isset($data['matricule1']) &&
                    isset($data['matricule2'])
                ) {
                    $type = $data['type'];
                    $newValue1 = $data['newValue1'];
                    $newValue2 = $data['newValue2'];
                    $studentId = $data['studentId'];
                    $matricule1 = $data['matricule1']; 
                    $matricule2 = $data['matricule2']; 
                } else {
                    echo json_encode(["success" => false, "message" => "all inputs are required"]);
                    exit();
                }
        
                if ($type !== '' && $newValue1 !== '' && $newValue2 !== '' && $studentId !== '' && $matricule1 !== '' && $matricule2 !== '') {
                    $changeRequest = new ChangeRequests($type, $newValue1, $newValue2, $studentId, $matricule1, $matricule2); 
                    $response = $changeRequest->add($conn);
                } else {
                    $response = ["success" => false, "message" => "inputs are empty"];
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
        case 'accepteRequest':
            if($method == "POST"){
                if (isset($data['requestId']) && isset($data['requestType']) && isset($data['newValue']) && isset($data['studentId']) ) {
                    $requestId = $data['requestId'];
                    $type = $data['requestType'];
                    $newValue = $data['newValue'];
                    $studentId = $data['studentId'];
                    $matricule1 = $data['matricule1'] ?? null;  // accept if exists
                    $matricule2 = $data['matricule2'] ?? null;  // accept if exists
                } else {
                    echo json_encode(["success" => false, "message" => "all inputs  are required"]);
                    exit();
                }
                
                if ($type !== '' && $requestId !== '' && $newValue !== '' && $studentId !== '') {
                    $response = ChangeRequests::accepteRequest($conn,$requestId,$type,$newValue,$studentId, $matricule1, $matricule2);
                } else {
                    $response = ["success" => false, "message" => "inputs  are vide"];
                }
            }else{
                $response = ["success" => false, "message" => "Invalid method"];
            }
        break;
        case 'refusedRequest':
            if($method == "POST"){
                if (isset($data['requestId'])) {
                    $requestId = $data['requestId'];
                } else {
                    echo json_encode(["success" => false, "message" => "requestId is required"]);
                    exit();
                }
                
                if ($requestId) {
                    $response = ChangeRequests::refusedRequest($conn,$requestId);
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