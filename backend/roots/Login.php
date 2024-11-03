<?php
header("Access-Control-Allow-Origin: *");
// السماح بالطرق المستخدمة (POST, GET, وغيرها)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/User.php'; // تأكد من تضمين User.php بشكل صحيح
require_once '../controllers/Etudient.php'; // تضمين ملف Etudient
require_once '../utils/JwtLogin.php';


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
        $jwt = JwtLogin::generateJWT($etudientData["Id"]); // إنشاء التوكن إذا كانت بيانات المستخدم صحيحة
        echo json_encode(["success" => true, "message" => "User exists", "token" => $jwt]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid email or password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email and password are required"]);
}
?>
