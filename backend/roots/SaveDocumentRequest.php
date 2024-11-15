<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['file'])) {
        $pdfFile = $_FILES['file'];

        // تحديد مكان حفظ الملف
        $uploadDirectory = '../../assets/Document Request/';
        $fileName = basename($pdfFile['name']);
        $filePath = $uploadDirectory . $fileName;

        // حفظ الملف
        if (move_uploaded_file($pdfFile['tmp_name'], $filePath)) {
            // إرجاع رابط الملف
            $fileUrl = "http://yourdomain.com/" . $filePath;
            echo json_encode(['success' => true, 'fileUrl' => $fileUrl]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error while saving file']);
        }
    }else{
        echo json_encode(['success' => false, 'message' => 'you must to send the file']);
    }
}
?>
