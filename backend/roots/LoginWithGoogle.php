<?php
header("Access-Control-Allow-Origin: *");
// السماح بالطرق المستخدمة (POST, GET, وغيرها)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../utils/JwtLogin.php';
require_once '../vendor/autoload.php';
session_start();

$client = new Google_Client();

$client->setRedirectUri('http://localhost/University-management/backend/roots/callback.php'); // رابط العودة
$client->addScope('email');//to get email

$loginUrl = $client->createAuthUrl();
header('Location: '.$loginUrl);

?>