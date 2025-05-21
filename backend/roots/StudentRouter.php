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
$data = json_decode(file_get_contents('php://input'), true);
 /*$data = json_decode(file_get_contents('php://input'), true);
    if ($endpoint !== "isExistEtudient"){
         $token = $data['token'] ?? null;
     if (empty($token)) {
        $response = ["success" => false, "message" => "Token is missing or empty"];
        echo json_encode($response);
        exit;
    }

    $decoded = JwtLogin::verifyJWT($token);

    if ($decoded === null) {
        $response = ["success" => false, "message" => "Invalid or expired token"];
        echo json_encode($response);
        exit;
    }
    }*/

// استجابة افتراضية
$response = ['success' => false, 'message' => 'Invalid request'];

try{
    switch($endpoint)
    {
        case 'addEtudient' :
            if($method == "POST"){
                if (isset($data['matricule']) && isset($data['firstName']) && isset($data['lastName']) && isset($data['educationYear']) && isset($data['section']) && isset($data['group']) &&  isset($data['email']) && isset($data['password']) && isset($data['phoneNumber'])) {
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
                    $phoneNumber = $data['phoneNumber'];
                } else {
                    echo json_encode(["success" => false, "message" => "all inputs  are required"]);
                    exit();
                }
                
                if ($matricule !== '' && $firstName !== '' && $lastName !== '' &&  $educationYear !== '' && $section !== '' && $group !== '' &&  $email !== '' && $password !== '' && $phoneNumber !== '') {
                    $etudient = new Etudient($firstName, $lastName, $email, $password,false, $matricule, $educationYear, $speciality, $section, $group,$phoneNumber);
                    $response=$etudient->addEtudient($conn);
                } else {
                    $response =["success" => false, "message" => "input cant be empty"];
                }
            }else{
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        case 'importStudents':
            if ($method == "POST") {
                if (isset($data['studentsData']) && is_array($data['studentsData'])) {
                    $students = $data['studentsData'];
                    $insertedStudents = [];
                    $failedStudents = [];
                    //Etudient::DeleteAllStudents($conn);
                    foreach ($students as $student) {
                            $matricule = $student['matricule'];
                            $firstName = $student['firstName'];
                            $lastName = $student['lastName'];
                            $educationYear = $student['educationYear'];
                            $speciality = isset($student['speciality']) ? $student['speciality'] : "";
                            $section = $student['section'];
                            $group = $student['group'];
                            $email = $student['email'];
                            $password = $student['password'];
                            $phone = $student['phone'];

                            $etudient = new Etudient($firstName, $lastName, $email, $password, false, $matricule, $educationYear, $speciality, $section, $group, $phone);
                            $d = Etudient::isExistEtudient_matricule($conn,$matricule,true);    
                            if($d['success']){
                               
                                        $response = $etudient->updateStudent_withoutChangePassword($conn);
                                    
                                }else{
                                    $response = $etudient->addEtudient($conn);
                                }
                                
                                if ($response['success']) {
                                    $insertedStudents[] = $student;
                                } else {
                                    $failedStudents[] = ["student" => $student, "error" => $response['message']];
                                }
                            
                       
                    }
        
                    $response = [
                        "success" => true,
                        "message" => "Bulk student upload completed",
                        "inserted" => count($insertedStudents),
                        "failed" => count($failedStudents),
                        "errors" => $failedStudents
                    ];
                } else {
                    $response = ["success" => false, "message" => "Invalid data format or missing studentsData"];
                }
            } else {
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
                if (isset($data['matricule']) && isset($data['password'])) {
                    $matricule = $data['matricule'];
                    $password = $data['password'];
                } else {
                    $response = ["success" => false, "message" => "matricule and password are required"];
                    echo json_encode($response);
                    exit();
                }

                if ($matricule !== '' && $password !== '') {
                    $response = Etudient::isExistEtudient($conn, $matricule, $password);
                } else {
                    $response = ["success" => false, "message" => "matricule and password are required (Not Empty)"];
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
        case 'getStudentByMatricule':
            if($method =="GET")
            {
                if (isset($_GET['matricule'])) 
                {
                    $matricule = $_GET['matricule'];
                } else 
                {
                    $response = ["success" => false, "message" => "matricule is required"];
                    echo json_encode($response);
                    exit();
                }

                if ($matricule !== '') {
                    $StudentData = Etudient::getByMatricule($conn, $matricule);
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
            case 'deleteAllStudents':
                if($method =="GET")
                {
                    $response= Etudient::DeleteAllStudents($conn);
                }else
                {
                    $response = ["success" => false, "message" => "Method does not match"];
                }
            break;
        case "firstLoginProcess":
            
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            
                // Validate and assign variables
                if (isset($data['studentId']) && isset($data['password'])) {
                    $studentId = $data['studentId']; // Sanitize the input
                    $password = $data['password']; // Sanitize the input
                } else {
                    echo json_encode(["success" => false, "message" => "studentId and password are required."]);
                    exit;
                }
            
                if ($studentId !== '' && $password !== '') {
                    $response1=Etudient::changePassword($conn, $studentId, $password);
                    $response2=Etudient::changeIsNewValue($conn, $studentId);
                    if($response1['success'] && $response2['success']) $response = ["success" => true , "message" => "First login process has been completed successfully."];
                    else $response = ["success"=> false, "message" => $response1['message'] . "\n" . $response2['message']];
                } else {
                    $response=(["success" => false, "message" => "studentId or password are empty value."]);
                }
            } else {
                $response=(["success" => false, "message" => "Invalid request method. Use POST."]);
            }
            break;
        case "setIsNew" :
            if (isset($data['isNewValue']) && isset($data['studentId'])) {
                $isNewValue = $data['isNewValue']; 
                $studentId = $data['studentId']; 
            } else {
                echo json_encode(["success" => false, "message" => "isNewValue et studentId are required."]);
                exit;
            }

            if ($isNewValue !== '' && $studentId !== '') {
                $response=Etudient::changeIsNewValue($conn, $studentId,$isNewValue);
                if($response['success']) $response = ["success" => true , "message" => "is new value changed successfully."];
                else $response = ["success"=> false, "message" => $response['message']];
            } else {
                $response=(["success" => false, "message" => "studentId or password are empty value."]);
            }
            break;
        case "test":
            $response = Etudient::isNew($conn,4414);
            break;
    }
}catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}

// إرسال الاستجابة
echo json_encode($response);
?>