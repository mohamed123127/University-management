<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/Etudient.php'; // تضمين ملف Etudient
require_once '../utils/JwtLogin.php';

// احصل على طريقة الطلب (GET, POST, PUT, DELETE)
$endpoint = $_GET['endpoint'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
if($method == "POST") $data = json_decode(file_get_contents('php://input'), true);

// استجابة افتراضية
$response = ['success' => false, 'message' => 'Invalid request'];

try{
    switch($endpoint)
    {
        case 'addEtudient' :
            if($method == "POST"){
                if (isset($data['matricule']) && isset($data['firstName']) && isset($data['lastName']) && isset($data['educationYear']) && isset($data['section']) && isset($data['group']) &&  isset($data['email']) && isset($data['password']) ) {
                    $matricule = $data['matricule'];
                    $firstName = $data['firstName'];
                    $lastName = $data['lastName'];
                    $educationYear = $data['educationYear'];
                    $speciality = "";
                    if(isset($data['speciality'])) $speciality = $data['speciality'];
                    $section = $data['section'];
                    $group = $data['group'];
                    $email = $data['email'];
                    $password = $data['password'];
                } else {
                    echo json_encode(["success" => false, "message" => "all inputs  are required"]);
                    exit();
                }
                
                if ($matricule !== '' && $firstName !== '' && $lastName !== '' &&  $educationYear !== '' && $section !== '' && $group !== '' &&  $email !== '' && $password !== '') {
                    $etudient = new Etudient($firstName, $lastName, $email, $password,false, $matricule, $educationYear, $speciality, $section, $group);
                    $response=$etudient->addEtudient($conn);
                } else {
                    $response =["success" => false, "message" => "input cant be empty"];
                }
            }else{
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        case 'isExistEtudient':
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
        case 'getStudentByEmail':
            if($method =="GET")
            {
                if (isset($_GET['email'])) 
                {
                    $email = $_GET['email'];
                } else 
                {
                    $response = ["success" => false, "message" => "Email is required"];
                    echo json_encode($response);
                    exit();
                }

                if ($email !== '') {
                    $StudentData = Etudient::getByEmail($conn, $email);
                    if ($StudentData != null) {
                        $response = ["success" => true, "isRegistered" => true,'Data' => $StudentData];
                    } else {
                        $response = ["success" => true, "isRegistered" => false];
                    }
                } else {
                    $response = ["success" => false, "message" => "email is required"];
                }
            }else
            {
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        case 'changeActivationStatus':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
            
                // Validate and assign variables
                if (isset($data['id']) && isset($data['status'])) {
                    $id = intval($data['id']); // Sanitize the input
                    $status = intval($data['status']); // Sanitize the input
                } else {
                    echo json_encode(["success" => false, "message" => "Id and status are required."]);
                    exit;
                }
            
                // Check for valid ID and status values
                if ($id > 0 && ($status === 0 || $status === 1)) {
                    // Check if the ID exists in the database
                    $sql_check = "SELECT Id FROM etudient WHERE Id = ?";
                    $stmt_check = $conn->prepare($sql_check);
                    $stmt_check->bind_param("i", $id);
                    $stmt_check->execute();
                    $stmt_check->store_result();
            
                    if ($stmt_check->num_rows > 0) {
                        // Proceed with update
                        $response=Etudient::changeActivate($conn, $id, $status);
                    } else {
                        $response=(["success" => false, "message" => "The provided ID does not exist."]);
                    }
                    $stmt_check->close();
                } else {
                    $response=(["success" => false, "message" => "Invalid ID or status value."]);
                }
            } else {
                $response=(["success" => false, "message" => "Invalid request method. Use POST."]);
            }
        break;
        case 'getAll':
            if ($method === 'GET') {
            $Students = Etudient::getall($conn);
            if ($Students != null) {
                $response = ["success" => true, 'Data' => $Students];
            } else {
                $response = ["success" => false, "message" => "it's not exists"];
            }
            } else {
                $response = ["success" => false, "message" => "Invalid request method. Use POST."];
            }
            break;
        default:
            $response = ["success" => false, "message" => "Invalid endpoint"];
            break;
        
    }
}catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}

// إرسال الاستجابة
echo json_encode($response);
?>