<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';
require_once '../controllers/VirtualRequest.php';  // Add this if it's missing
require_once '../utils/JwtLogin.php';

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? null;

$response = ["success" => false, "message" => "Invalid request"];  // Default response
 $data = json_decode(file_get_contents('php://input'), true);
   /*   $token = $data['token'] ?? null;
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
    }*/

try {
    switch($endpoint){
        case 'addVRequest':
            if($method == "POST") {
                $data = json_decode(file_get_contents('php://input'), true);
                
                if (isset($data['RequestType']) && isset($data['Status']) && isset($data['CurrenttValue']) && isset($data['NewValue']) && isset($data['SubmissionDate']) && isset($data['LastUpdaterdDate']) && isset($data['StudentId'])) {
                    $RequestType = $data['RequestType'];
                    $Status = $data['Status'];
                    $CurrenttValue = $data['CurrenttValue'];
                    $NewValue = $data['NewValue'];
                    $SubmissionDate = $data['SubmissionDate'];
                    $LastUpdaterdDate = $data['LastUpdaterdDate'];
                    $StudentId = $data['StudentId'];
                    
                    if ($RequestType !== '' && $Status !== '' && $CurrenttValue !== '' && $NewValue !== ''  && $SubmissionDate !== ''  && $LastUpdaterdDate !== ''  && $StudentId !== '') {
                        $vreques = new VRequest($RequestType,$Status,$CurrenttValue, $NewValue,$SubmissionDate,$LastUpdaterdDate,$StudentID);
                        $vreques->Add($conn);
                        $response = ["success" => true, "message" => "Virtual Request added successfully"];
                    } else {
                        $response = ["success" => false, "message" => "Data are required"];
                    }
                } else {
                    $response = ["success" => false, "message" => "All inputs are required"];
                }
            } else {
                $response = ["success" => false, "message" => "Invalid method"];
            }
            break;
          
          
            case 'UpdateStatus':
                if ($method == "POST") {
                    $data = json_decode(file_get_contents('php://input'), true);
            
                    if (isset($data['Id']) && isset($data['Status'])) {
                        $Id = $data['Id'];
                        $currentStatus = $data['Status']; 
            
                        $response = VRequest::UpdateStatus($conn, $Id, $currentStatus);
                    } else {
                        $response = ["success" => false, "message" => "معرف السجل والحالة الحالية مطلوبان"];
                    }
                } else {
                    $response = ["success" => false, "message" => "طريقة غير صالحة"];
                }
                break;
               

        case 'getAll':
            if ($method == "GET") {
            $response = VRequest::getall($conn);
            if ($response != null) {
                $response = ["success" => true, 'Data' => $vreques];
            } else {
                $response = ["success" => false, "message" => "response not exists"];
            }
            }else {
                $response = ["success" => false, "message" => "طريقة غير صالحة"];
            }
            break;
        case 'getById':
                if ($method == "GET") {
                    if(isset($_GET["id"])){
                        $id=$_GET["id"];
                    }else{
                        echo json_encode (["success" => false, "message" => "id dont sended"]);
                        exit();
                    }
                    if($id!=""){
                       
                        $response= VRequest::getById($conn,$id);

                    }else{
                        $response = ["success" => false, "message" => "id is empty"];
                    }
                
                }else {
                    $response = ["success" => false, "message" => "طريقة غير صالحة"];
                }
         break;
         case 'getByRequestId':
            if ($method == "GET") {
                if(isset($_GET["id"])){
                    $id=$_GET["id"];
                }else{
                    echo json_encode (["success" => false, "message" => "id dont sended"]);
                    exit();
                }
                if($id!=""){
                   
                    $response= VRequest::getByRequestId($conn,$id);

                }else{
                    $response = ["success" => false, "message" => "id is empty"];
                }
            
            }else {
                $response = ["success" => false, "message" => "طريقة غير صالحة"];
            }
     break;
        default:
            $response = ["success" => false, "message" => "Invalid endpoint"];
            break;
    }

    
} catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}
echo json_encode($response);
?>