<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/User.php'; // تأكد من تضمين User.php بشكل صحيح
require_once '../controllers/Etudient.php'; // تضمين ملف Etudient

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];
} else {
    echo json_encode(["success" => false, "message" => "Email and password are required"]);
    exit();
}

if ($email !== '' && $password !== '') {
    $etudientData = Etudient::isExistEtudient($conn, $email, $password);
    if ($etudientData != null) {
        echo json_encode(["success" => true, "message" => "User exists", "user" => $etudientData]);
    } else {
        echo($email. "  /  " . $password);
        echo json_encode(["success" => false, "message" => "Invalid email or password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email and password are required"]);
}
?>
