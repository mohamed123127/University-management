<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';
require_once '../controllers/Announcement.php'; 
require_once '../utils/JwtLogin.php';

$data = json_decode(file_get_contents('php://input'), true);

// Check if required fields are set in the incoming request
if (isset($data['recipient']) && isset($data['title']) && isset($data['content'])) {
    $recipient = $data['recipient'];
    $title = $data['title'];
    $content = $data['content'];
} else {
    echo json_encode(["success" => false, "message" => "Recipient, title, and content are required"]);
    exit();
}

if ($recipient !== '' && $title !== '' && $content !== '') {
    $announcement = new Announcement($conn, $recipient, $title, $content);
    $announcement->add($conn , $recipient, $title, $content); 
} else {
    echo json_encode(["success" => false, "message" => "Recipient, title, and content cannot be empty"]);
}
?>
