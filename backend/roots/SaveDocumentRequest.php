<?php
header("Access-Control-Allow-Origin: *");
// السماح بالطرق المستخدمة (POST, GET, وغيرها)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    try{
        if (isset($_FILES['file']) && isset($_POST['type'])) {
            $pdfFile = $_FILES['file'];
            $type = $_POST['type'];
            // تحديد مكان حفظ الملف
            $uploadDirectory = '../../assets/'.$type.'/';
            $fileName = basename($pdfFile['name']);
            $filePath = $uploadDirectory . $fileName;
            
            if (!is_dir($uploadDirectory)) {
                // إنشاء المجلد إذا لم يكن موجودًا
                mkdir($uploadDirectory, 0777, true);
            }
            // حفظ الملف
            if (move_uploaded_file($pdfFile['tmp_name'], $filePath)) {
                // تحديد رابط كامل للملف و إرجاع رابطه
                $uploadDirectory = 'University-management/assets/'.$type.'/';
                $fileName = basename($pdfFile['name']);
                $filePath = $uploadDirectory . $fileName;
                $fileUrl = "C:/xampp/htdocs/" . $filePath;
                echo json_encode(['success' => true, 'fileUrl' => $fileUrl]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error while saving file']);
            }
        }else{
            echo json_encode(['success' => false, 'message' => 'you must to send the file']);
        }
    }catch(Exception $e){
        echo json_encode(['success' => false, 'message' => $e]);
    }
}else{
    echo json_encode(['success' => false, 'message' => 'Method dosnt match']);
}
?>