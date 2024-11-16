<?php
header("Access-Control-Allow-Origin: *");
// السماح بالطرق المستخدمة (POST, GET, وغيرها)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; // الاتصال بقاعدة البيانات
require_once '../controllers/User.php'; // تأكد من تضمين User.php بشكل صحيح
require_once '../controllers/Etudient.php'; // تضمين ملف Etudient


class Etudient extends User {
    private $matricule;
    private $firstName;
    private $lastName;
    private $faculty;
    private $educationYear;
    private $specialty;
    private $section;
    private $group;

    const TABLE_NAME = "etudient";

    public function __construct($firstName, $lastName, $email, $password, $isActive, $matricule, $faculty, $educationYear, $specialty, $section, $group) {
        parent::__construct($email, $password, $isActive);
        $this->matricule = $matricule;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->faculty = $faculty;
        $this->educationYear = $educationYear;
        $this->specialty = $specialty;
        $this->section = $section;
        $this->group = $group;
    }

    public static function isExistEtudient($conn, $email, $password) {
        $sql = "SELECT `Id`, `Active` FROM etudient WHERE email = ? AND password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $etudient = $result->fetch_assoc();
            if ($etudient['Active']) {
                return $etudient['Id'];
            }
        }
        return null;
    }

    public static function getById($conn, $id) {
        $sql = "SELECT * FROM etudient WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }
}
    public function addEtudient($conn) {
        
        try{
            $sql = "INSERT INTO  etudient ( matricule , firstName , lastName ,faculty , educationYear, specialty, section, grp , email, password, Active,date) 
                VALUES ( ?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIME())";
    
        $stmt = $conn->prepare($sql);
        

        if (!$stmt) {
            echo json_encode(["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
        }
        
        
        // Bind parameters for 10 values (update type of parameters to match input data)
        $stmt->bind_param("ssssssssssi",$this->matricule, $this->firstName, $this->lastName, $this->faculty, $this->educationYear, $this->specialty, $this->section, $this->group, $this->email, $this->password, $this->isActive);
       
        if ($stmt->execute()) {
           
            echo json_encode(["success" => true, "message" => "Student added successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to add student."]);
        }

        }catch(Exception $ex){
            echo json_encode(["success" => false, "message" => $ex]);
        }
        
    }
        
}

    


?>
