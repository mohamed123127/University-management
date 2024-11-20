<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/DocumentRequest.php'; // تضمين ملف Etudient
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
        case 'SaveDocumentRequestAsPdf':
            if($method == "POST"){
                $Data = json_decode(file_get_contents("php://input"), true);
                if (isset($Data['file']) && isset($Data['type'])) {
                    $pdfFile = $Data['file'];
                    $type = $Data['type'];
                    // تحديد مكان حفظ الملف
                    $uploadDirectory = '../../assets/'.$type.'/';
                    $fileName = basename($pdfFile['name']);
                    $filePath = $uploadDirectory . $fileName;
            
                    // حفظ الملف
                    if (move_uploaded_file($pdfFile['tmp_name'], $filePath)) {
                        // تحديد رابط كامل للملف و إرجاع رابطه
                        $uploadDirectory = 'University-management/assets/'.$type.'/';
                        $fileName = basename($pdfFile['name']);
                        $filePath = $uploadDirectory . $fileName;
                        $fileUrl = "C:/xampp/htdocs/" . $filePath;
                        $response =['success' => true, 'fileUrl' => $fileUrl];
                    } else {
                        $response =['success' => false, 'message' => 'Error while saving file'];
                    }
                }else{
                    $response =['success' => false, 'message' => 'you must to send the file'];
                }
            }else
            {
                $response = ["success" => false, "message" => "Method does not match"];
            }
        break;
        case 'SaveDocumentRequestInDb':
            if($method == "POST"){
                if (isset($data['type']) && isset($data['documentUrl']) && isset($data['studentId'])) {
                    $type = $data['type'];
                    $documentUrl = $data['documentUrl'];
                    $studentId = $data['studentId'];
                } else {
                    echo json_encode(["success" => false, "message" => "Document type and document url and student id are required"]);
                    exit();
                }
                
                if ($type !== '' && $documentUrl !== '' && $studentId !== '') {
                    $documentRequest = new DocumentRequest($type,'Pending','',date("Y-m-d"),date("Y-m-d"),$documentUrl,$studentId);
                    if ($documentRequest != null) {
                         if($documentRequest->Add($conn))
                         $response = ["success" =>true, "message" => "Document request sended successfuly"];
                    } 
                } else {
                    $response = ["success" => false, "message" => "Document type and document url and student id are required"];
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