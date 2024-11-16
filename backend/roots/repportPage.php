<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';
require_once '../controllers/Repport.php'; 
require_once '../utils/JwtLogin.php';

$data = json_decode(file_get_contents('php://input'), true);

// Check if required fields are set in the incoming request
if (isset($data['title']) && isset($data['content'])) {
    $title = $data['title'];
    $content = $data['content'];
} else {
    echo json_encode(["success" => false, "message" => "Title, and content are required"]);
    exit();
}

if ($title !== '' && $content !== '') {
    $repport = new Repport($conn, $title, $content);
    $repport->add($conn , $title, $content); 
} else {
    echo json_encode(["success" => false, "message" => "title, and content cannot be empty"]);
}
?>
