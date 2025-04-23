<?php
header("Access-Control-Allow-Origin: *");
// السماح بالطرق المستخدمة (POST, GET, وغيرها)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . '/../../config/database.php';
require '../../packages/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;



class EmailServises {
    
    public static function CheckEmail($conn , $email) {
        

        $sql = "SELECT * FROM Etudient WHERE email = ?";
        $stmt = $conn->prepare($sql);

    
        if (!$stmt) {
            throw new Exception("Database query preparation failed: " . $conn->error);
        }

        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

    
        return $result->num_rows > 0;
    }



    public static function SendEmail($EmailReceiver, $Title, $Content) {
        $mail = new PHPMailer(true);
    
        try {
            // SMTP configuration
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = "aboumerdas3@gmail.com";
            $mail->Password = "iwiv bnel sxpr vvfq";
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Use TLS encryption
            $mail->Port = 465; // Port for SSL
    
            // Set email metadata
            $mail->setFrom("aboumerdas3@gmail.com", 'Boumerdess-Univ');
            $mail->addAddress($EmailReceiver);
            $mail->isHTML(true);
    
            $mail->Subject = $Title;
            $mail->Body    = $Content;
    
            // Send email
            $mail->send();
            return "Email sent successfully!";
        } catch (Exception $e) {
            return "Failed to send email. Error: {$mail->ErrorInfo}";
        }
    }


    public static function checkExistedEmail(){
        
    }
}



?>