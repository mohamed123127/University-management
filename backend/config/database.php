<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "University Managment";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
    }
} catch(Exception $e) {
    echo json_encode(["success" => false, "message" => "هناك خطأ في الاتصال بقاعدة البيانات"]);
}
?>
