<?php
header("Access-Control-Allow-Origin: *");
// السماح بالطرق المستخدمة (POST, GET, وغيرها)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../utils/JwtLogin.php';
require_once '../packages/vendor/autoload.php';
require_once '../config/SecreteData.php';

session_start();

$client = new Google_Client();
$client->setClientId(SecreteData::$clientId); // استبدلها بـ Client ID
$client->setClientSecret(SecreteData::$clientSecrete); // استبدلها بـ Client Secret
$client->setRedirectUri('https://www.university-management.website/roots/callback.php'); // رابط العودة
$client->addScope('email');//to get email

$loginUrl = $client->createAuthUrl();
header('Location: '.$loginUrl);

?>
