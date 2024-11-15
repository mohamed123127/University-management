<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/DocumentRequest.php'; // تأكد من تضمين User.php بشكل صحيح
require_once '../utils/JwtLogin.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['type']) && isset($data['documentUrl'])) {
    $type = $data['type'];
    $documentUrl = $data['documentUrl'];
} else {
    echo json_encode(["success" => false, "message" => "Document type and document url are required"]);
    exit();
}

if ($type !== '' && $documentUrl !== '') {
    $documentRequest = new DocumentRequest($type,'Pending','',date("Y-m-d"),date("Y-m-d"),$documentUrl);
    if ($documentRequest != null) {
        $documentRequest->Add($conn);
    } 
} else {
    echo json_encode(["success" => false, "message" => "Document type and document url are required"]);
}
?>
