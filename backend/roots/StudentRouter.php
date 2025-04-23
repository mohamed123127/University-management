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
                if (isset($data['matricule']) && isset($data['firstName']) && isset($data['lastName']) && isset($data['educationYear']) && isset($data['section']) && isset($data['group']) &&  isset($data['email']) && isset($data['phoneNumber']) && isset($data['password']) ) {
                    $matricule = $data['matricule'];
                    $firstName = $data['firstName'];
                    $lastName = $data['lastName'];
                    $educationYear = $data['educationYear'];
                    $speciality = "";
                    if(isset($data['speciality'])) $speciality = $data['speciality'];
                    $section = $data['section'];
                    $group = $data['group'];
                    $email = $data['email'];
                    $phoneNumber = $data['phoneNumber'];
                    $password = $data['password'];
                } else {
                    echo json_encode(["success" => false, "message" => "all inputs  are required"]);
                    exit();
                }
                
                if ($matricule !== '' && $firstName !== '' && $lastName !== '' &&  $educationYear !== '' && $section !== '' && $group !== '' &&  $email !== '' && $password !== '' && $phoneNumber !== '' ) {
                    $etudient = new Etudient($firstName, $lastName, $email, $password,false, $matricule, $educationYear, $speciality, $section, $group,$phoneNumber);
                    $response=$etudient->addEtudient($conn);
                } else {
                    $response =["success" => false, "message" => "input cant be empty"];
                }
            }else{
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        //---------------------------
       case 'setRole':
         if ($method == "POST" && isset($data['studentId']) && isset($data['role'])) {
             $response = etudient::SetRole($conn, $data['studentId'], $data['role']);
         } else {
              $response = ["success" => false, "message" => "Invalid request"];
         }
       break;
        
       case 'getStudentWithRole':
        if ($method == "GET" && isset($_GET['studentId'])) {
            $studentId = $_GET['studentId'];
            Etudient::getStudentWithRole($conn, $studentId);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid request. studentId is required"]);
        }
        break;
        
        case 'getStudentsRole':
            if ($method == "GET" ) {
                
                Etudient::getStudentsRole($conn);
            } else {
                echo json_encode(["success" => false, "message" => "Invalid request. studentId is required"]);
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
                    $response = Etudient::isExistEtudient($conn, $email, $password);
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
                        $response = ["success" => false, "isRegistered" => false];
                    }
                } else {
                    $response = ["success" => false, "message" => "email is required"];
                }
            }else
            {
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        case 'changeStatus':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            
                // Validate and assign variables
                if (isset($data['id']) && isset($data['status'])) {
                    $id = intval($data['id']); // Sanitize the input
                    $status = intval($data['status']); // Sanitize the input
                } else {
                    echo json_encode(["success" => false, "message" => "Id and status are required."]);
                    exit;
                }
            
                if ($id > 0 ) {
                    $response=Etudient::changeActivate($conn, $id, $status);
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