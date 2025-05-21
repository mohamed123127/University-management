<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/DocumentRequest.php'; // تأكد من تضمين User.php بشكل صحيح
require_once '../utils/JwtLogin.php';

 $data = json_decode(file_get_contents('php://input'), true);
     /* $token = $data['token'] ?? null;
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


if (isset($data['type']) && isset($data['documentUrl']) && isset($data['studentId'])) {
    $type = $data['type'];
    $documentUrl = $data['documentUrl'];
    $studentId = $data['studentId'];
} else {
    echo json_encode(["success" => false, "message" => "Document type and document url and student id are required"]);
    exit();
}

if ($type !== '' && $documentUrl !== '' && $studentId !== '') {
    $documentRequest = new DocumentRequest($type,'Pending','',date("Y-m-d"),date("Y-m-d"),$documentUrl,$studentId);
    if ($documentRequest != null) {
         if($documentRequest->Add($conn))
        echo json_encode(["success" =>true, "message" => "Document request sended successfuly"]);
    } 
} else {
    echo json_encode(["success" => false, "message" => "Document type and document url and student id are required"]);
}
?>
