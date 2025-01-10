<?php
header("Access-Control-Allow-Origin: *");
// السماح بالطرق المستخدمة (POST, GET, وغيرها)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../packages/vendor/autoload.php';
require_once '../config/SecreteData.php';

/*$dotenv = Dotenv\Dotenv::createImmutable(realpath(__DIR__ . '\\..\\'));
$dotenv->load();

// الوصول إلى المتغيرات
$googleClientId = getenv('GOOGLE_OAUTH_CLIENT_ID');
$googleClientSecret = getenv('GOOGLE_OAUTH_CLIENT_SECRET');*/

session_start();

$client = new Google_Client();
$client->setClientId(SecreteData::$clientId); // استبدلها بـ Client ID
$client->setClientSecret(SecreteData::$clientSecrete); // استبدلها بـ Client Secret
$client->setRedirectUri('https://www.university-management.website/roots/callback.php');//الرابط العودة الذي تم تعيينه في Google People APi

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);

    // جلب معلومات المستخدم
    $google_oauth = new Google_Service_Oauth2($client);
    $userInfo = $google_oauth->userinfo->get();

    // إعادة التوجيه إلى React مع البيانات
    $redirectUrl = 'https://www.university-management.website?email=' . urlencode($userInfo->email) ;
    header('Location: ' . $redirectUrl);
} else {
    echo json_encode(["success" => false, "message" => "Authentication failed"]);
}
?>
