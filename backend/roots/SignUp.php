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



$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['matricule']) && isset($data['firstName']) && isset($data['lastName']) && isset($data['faculty']) && isset($data['educationYear']) && isset($data['specialty']) && isset($data['section']) && isset($data['group']) &&  isset($data['email']) && isset($data['password']) ) {
    $matricule = $data['matricule'];
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $faculty = $data['faculty'];
    $educationYear = $data['educationYear'];
    $specialty = $data['specialty'];
    $section = $data['section'];
    $group = $data['group'];
    $email = $data['email'];
    $password = $data['password'];
} else {
    echo json_encode(["success" => false, "message" => "all inputs  are required"]);
    exit();
}

if ($matricule !== '' && $firstName !== '' && $lastName !== '' && $faculty !== '' && $educationYear !== '' && $section !== '' && $group !== '' &&  $email !== '' && $password !== '') {
    $etudient = new Etudient($firstName, $lastName, $email, $password,false, $matricule, $faculty, $educationYear, $specialty, $section, $group);
    $etudient->addEtudient($conn);
} else {
    echo json_encode(["success" => false, "message" => "Email and password are required"]);
}
?>
