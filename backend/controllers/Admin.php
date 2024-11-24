<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/User.php'; // تأكد من تضمين User.php بشكل صحيح

class Admin extends User{
    public function __construct($email, $password) {
        parent::__construct($email, $password);
    }

    public function addAdmin($conn) {
        
        try{
            $sql = "INSERT INTO  administration (  Email, password) 
                VALUES ( ?,?)";
    
        $stmt = $conn->prepare($sql);
        

        if (!$stmt) {
           return ["success" => false, "message" => "Database statement preparation failed: " . $conn->error];
        }
        
        
        // Bind parameters for 10 values (update type of parameters to match input data)
        $stmt->bind_param("ss",$this->email, $this->password);
       
        if ($stmt->execute()) {
           
            echo json_encode(["success" => true, "message" => "Admin added successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to add admin."]);
        }

        }catch(Exception $ex){
            echo json_encode(["success" => false, "message" => $ex]);
        }
        
    }

    public static function isExistAdmin($conn, $email, $password) {
        $sql = "SELECT `Id` FROM administration WHERE email = ? AND password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $admin = $result->fetch_assoc();
            return $admin['Id'];
        }
        return null;
    }


    public static function getall($conn) {
        try {
            $sql = "SELECT * FROM administration";
            $stmt = $conn->prepare($sql);
    
            if (!$stmt) {
                echo json_encode(["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
                return;
            }
    
            $stmt->execute();
            $result = $stmt->get_result();
    
            $Admins = [];
            while ($row = $result->fetch_assoc()) {
                $Admins[] = $row;
            }
    
            echo json_encode(["success" => true, "students" => $Admins]);
    
            $stmt->close();
        } catch (Exception $ex) {
            echo json_encode(["success" => false, "message" => "An error occurred: " . $ex]);
        }
    }
}



?>