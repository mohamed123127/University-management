<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/Etudient.php'; // تضمين ملف Etudient
require_once '../utils/JwtLogin.php';


$StudentId = Etudient::changeActivate($conn, $id, $status);


?>