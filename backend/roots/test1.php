<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/DocumentRequest.php'; // تضمين ملف Etudient
require_once '../utils/JwtLogin.php';

$request =new DocumentRequest($Type, $Status, $Notes, $SubmissionDate, $LastUpdatedDate, $DocumentUrl, $studentId);



?>