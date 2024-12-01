<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';

class Admin {
    private $firstName;
    private $lastName;
    private $email;
    private $password;

    public function __construct($firstName, $lastName, $email, $password) {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->password = $password;
    }

    public function addAdmin($conn) {
        try {
            $sql = "INSERT INTO administration (firstName, lastName, Email, password) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);

        if (!$stmt) {
           return ["success" => false, "message" => "Database statement preparation failed: " . $conn->error];
        }
        
        
        // Bind parameters for 10 values (update type of parameters to match input data)
        $stmt->bind_param("ssss",$this->firstName,$this->lastName,$this->email, $this->password);
       
        if ($stmt->execute()) {
           
           return (["success" => true, "message" => "Admin added successfully."]);
        } else {
            return (["success" => false, "message" => "Failed to add admin."]);
        }
        } catch (Exception $ex) {
            return (["success" => false, "message" => $ex->getMessage()]);
        }
    }

    public static function getById($conn, $id) {
        $sql = "SELECT * FROM administration WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }

    public static function isExistAdmin($conn, $email, $password) {
        $sql = "SELECT `id` FROM administration WHERE email = ? AND password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        if ($result->num_rows > 0) {
            $admin = $result->fetch_assoc();
            return $admin['id'];
        }
        return null;
    }

    public static function getAll($conn) {
        try {
            $sql = "SELECT * FROM administration";
            $stmt = $conn->prepare($sql);

            if (!$stmt) {
                return (["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
            }

            $stmt->execute();
            $result = $stmt->get_result();

            $Admins = [];
            while ($row = $result->fetch_assoc()) {
                $Admins[] = $row;
            }

            $stmt->close();
            $conn->close();

            return (["success" => true, "Administrations" => $Admins]);
        } catch (Exception $ex) {
            return (["success" => false, "message" => "An error occurred: " . $ex->getMessage()]);
        }
    }
}
?>