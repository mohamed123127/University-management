<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once '../utils/JwtLogin.php'; // مكتبة JWT (مثلاً firebase/php-jwt)

// تحديد endpoint المطلوب
$endpoint = $_GET['endpoint'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
if($method == "POST") $data = json_decode(file_get_contents('php://input'), true);

// استجابة افتراضية
$response = ['success' => false, 'message' => 'Invalid request'];

try {
    switch ($endpoint) {
        case "verifyJwtToken":
            if ($method === "POST") {
                // جلب الهيدر Authorization
              $authHeader = null;
/*if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
} elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
}*/
if (isset($data['token'])) {
    $authHeader = $data['token'];
   
}

                if (!$authHeader) {
                    $response = ["success" => false, "message" => 'Authorization header not found'];
                    break;
                }
       
/*if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
                    $token = $matches[1];
                    
                } else {
                    $response = ["success" => false, "message" => 'Invalid authorization header format'];
                    break;
                }*/
                // تحقق من صحة التوكن
                $decoded = JwtLogin::verifyJWT($authHeader ); // يجب أن تُعيد null إذا غير صال
               
                if ($decoded === null) {
                    $response = ["success" => false, "message" => 'Invalid or expired token'];
                    break;
                }

                $response = ["success" => true, "user" => $decoded]; // يمكنك ترجيع البيانات أيضا
            } else {
                $response = ["success" => false, "message" => "Invalid method"];
            }
            break;

        default:
            $response = ['success' => false, 'message' => 'Endpoint not exist'];
            break;
    }
} catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}

echo json_encode($response);
?>
