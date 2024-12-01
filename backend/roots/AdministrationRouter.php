<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';
require_once '../controllers/Admin.php';
require_once '../utils/JwtLogin.php';


$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? null;
if($method == "POST") $data = json_decode(file_get_contents('php://input'), true);



$response = ['success' => false, 'message' => 'Invalid request'];

try{
    switch($endpoint){
        case 'addAdmin' :
            if($method == "POST"){
                $data = json_decode(file_get_contents('php://input'), true);
                if (isset($data['firstName']) && isset($data['lastName']) && isset($data['email']) && isset($data['password']) ) {
                    $firstName = $data['firstName'];
                    $lastName = $data['lastName'];
                    $email = $data['email'];
                    $password = $data['password'];
                } else {
                    echo json_encode(["success" => false, "message" => "all inputs  are required"]);
                    exit();
                }
                
                if ($firstName !== '' && $lastName !== '' && $email !== '' && $password !== '') {
                    $admin = new Admin($firstName, $lastName, $email, $password);
                    $response = $admin->addAdmin($conn);
                } else {
                    $response = ["success" => false, "message" => "all input are required"];
                }
            }else
            {
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        case 'isExistAdmin':
            if($method == "POST"){
                if (isset($data['email']) && isset($data['password'])) {
                    $email = $data['email'];
                    $password = $data['password'];
                } else {
                    $response = ["success" => false, "message" => "Email and password are required"];
                    echo json_encode($response);
                    exit();
                }

                if ($email !== '' && $password !== '') {
                    $AdminId = Admin::isExistAdmin($conn, $email, $password);
                    if ($AdminId != null) {
                        $jwt = JwtLogin::generateJWT($AdminId); // إنشاء التوكن إذا كانت بيانات المستخدم صحيحة
                        if($AdminId == 1){
                            $response = ["success" => true, "message" => "Admin exists","IsGeneralAdmin" => true, "token" => $jwt,'id' => $AdminId];
                        }else{
                            $response = ["success" => true, "message" => "Admin exists","IsGeneralAdmin" => false, "token" => $jwt,'id' => $AdminId];
                        }
                    } else {
                        $response = ["success" => false, "message" => "Invalid email or password"];
                    }
                } else {
                    $response = ["success" => false, "message" => "Email and password are empty!!"];
                }
            }else
            {
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        case 'getAll':
            $admin = Admin::getAll($conn);
            if ($admin != null) {
                $response = ["success" => true, 'Data' => $admin];
            } else {
                $response = ["success" => false, "message" => "it's not exists"];
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