<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/Etudient.php'; // تضمين ملف Etudient
require_once '../utils/JwtLogin.php';

// احصل على طريقة الطلب (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? null;

// استجابة افتراضية
$response = ['success' => false, 'message' => 'Invalid request'];

try{
    switch($endpoint)
    {
        case 'isExistEtudient':
            if($method == "POST"){
                $data = json_decode(file_get_contents('php://input'), true);
                if (isset($data['email']) && isset($data['password'])) {
                    $email = $data['email'];
                    $password = $data['password'];
                } else {
                    $response = ["success" => false, "message" => "Email and password are required"];
                    echo json_encode($response);
                    exit();
                }

                if ($email !== '' && $password !== '') {
                    $StudentId = Etudient::isExistEtudient($conn, $email, $password);
                    if ($StudentId != null) {
                        $jwt = JwtLogin::generateJWT($StudentId); // إنشاء التوكن إذا كانت بيانات المستخدم صحيحة
                        $response = ["success" => true, "message" => "User exists", "token" => $jwt,'id' => $StudentId];
                    } else {
                        $response = ["success" => false, "message" => "Invalid email or password"];
                    }
                } else {
                    $response = ["success" => false, "message" => "Email and password are required"];
                }
            }else
            {
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        case 'getStudentById':
            if($method =="GET")
            {
                if (isset($_GET['id'])) 
                {
                    $id = $_GET['id'];
                } else 
                {
                    $response = ["success" => false, "message" => "Id is required"];
                    echo json_encode($response);
                    exit();
                }

                if ($id !== '') {
                    $StudentData = Etudient::getById($conn, $id);
                    if ($StudentData != null) {
                        $response = ["success" => true, 'Data' => $StudentData];
                    } else {
                        $response = ["success" => false, "message" => "it's not exists data by this id"];
                    }
                } else {
                    $response = ["success" => false, "message" => "Id is required"];
                }
            }else
            {
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        default:
            $response = ['success' => false, 'message' => 'Endpoint not exsist'];
        break;
    }
}catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}

// إرسال الاستجابة
echo json_encode($response);
?>