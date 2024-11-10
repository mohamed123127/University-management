<?php
header("Access-Control-Allow-Origin: *");

require_once('../packages/vendor/autoload.php');
use \Firebase\JWT\JWT;

class JwtLogin {
    private static $key = "pizza"; // Use private access modifier for security

    public static function generateJWT($userId) {
        $payload = [
            //"iss" => "http://yourwebsite.com", // اسم الجهة التي أصدرت التوكن (اختياري)
            //"aud" => "http://yourwbebsite.com", // اسم الجهة المستقبلة للتوكن (اختياري)
            //"iat" => time(),                  // وقت إصدار التوكن (اختياري)
            //"exp" => time() + (60 * 60),      // وقت انتهاء صلاحية التوكن (ساعة واحدة)
            "userId" => $userId               // بيانات المستخدم
        ];

        return JWT::encode($payload, self::$key, 'HS256'); // تشفير التوكن باستخدام المفتاح السري
    }

    public static function verifyJWT($jwt) {
        try {
            $decoded = JWT::decode($jwt, new \Firebase\JWT\Key(self::$key, 'HS256')); // فك التشفير والتحقق من صحة التوكن
            return (array) $decoded;
        } catch (Exception $e) {
            return null; // في حال فشل التحقق، يتم إرجاع null
        }
    }
}
?>
