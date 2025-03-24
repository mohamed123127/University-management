<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; 
require_once '../controllers/User.php'; 
require_once '../controllers/Etudient.php'; 
require_once '../utils/WebServices/EmailServices.php'; 
require_once '../utils/JwtLogin.php';



class Etudient extends User {
    private $matricule;
    private $firstName;
    private $lastName;
    private $educationYear;
    private $specialty;
    private $section;
    private $group;

    const TABLE_NAME = "etudient";

    public function __construct($firstName, $lastName, $email, $password, $isActive, $matricule, $educationYear, $specialty, $section, $group) {
        parent::__construct($email, $password, $isActive);
        $this->matricule = $matricule;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
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
            $isActive = $etudient['Active'];
            $StudentId = $etudient['Id'];
            if ($isActive) {
                $jwt = JwtLogin::generateJWT($StudentId); // إنشاء التوكن إذا كانت بيانات المستخدم صحيحة
                return ["success" => true, "message" => "User exists", "token" => $jwt,'id' => $StudentId];
            }else{
                return ["success" => false, "message" => "your account is not active"];
            }
        }else{
            return ["success" => false, "message" => "Invalid email or password"];
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
    public static function getByEducationYear($conn, $EducationYear) {
        $sql = "SELECT Id FROM etudient WHERE EducationYear = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $EducationYear);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $studentsId = []; // مصفوفة فارغة لتخزين القيم
            while ($row = $result->fetch_assoc()) {
                $studentsId[] = $row['Id']; // جمع كل قيمة id
            }
            return $studentsId;
        }
        return null;
    }
    public static function getAllId($conn) {
        $sql = "SELECT Id FROM etudient";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $studentsId = []; // مصفوفة فارغة لتخزين القيم
            while ($row = $result->fetch_assoc()) {
                $studentsId[] = $row['Id']; // جمع كل قيمة id
            }
            return $studentsId;
        }
        return null;
    }
    public static function getByEmail($conn, $email) {
        $sql = "SELECT * FROM etudient WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }
    public function addEtudient($conn) {
        
        try{
            $student = $this->getByEmail($conn,$this->email);
            if($student == null){
            $sql = "INSERT INTO  etudient ( matricule , firstName , lastName  , educationYear, Speciality, section, grp , email, password, Active) 
                VALUES ( ?,?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
        $stmt = $conn->prepare($sql);
        

        if (!$stmt) {
            return(["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
        }
        
        
        // Bind parameters for 10 values (update type of parameters to match input data)
        $stmt->bind_param("sssssssssi",$this->matricule, $this->firstName, $this->lastName, $this->educationYear, $this->specialty, $this->section, $this->group, $this->email, $this->password, $this->isActive);
       
        if ($stmt->execute()) {
           
            return(["success" => true, "message" => "Student added successfully."]);
        } else {
            return(["success" => false, "message" => "Failed to add student."]);
        }
        }else{
            return ["success"=> false, "message" => "this email has aleardy used"];
        }
        }catch(Exception $ex){
            return(["success" => false, "message" => $ex->getMessage()]);
        }
        
    }
    public static function changeActivate($conn, $id, $status) {
        try {
            $sql = "UPDATE etudient SET Active = ? WHERE Id = ?";
            $stmt = $conn->prepare($sql);
    
            if (!$stmt) {
                return([
                    "success" => false,
                    "message" => "Database statement preparation failed: " . $conn->error
                ]);
            }
    
            $stmt->bind_param("ii", $status, $id);
    
            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    if($status == 1){
                        $studentData = Etudient::getById($conn,$id);
                        if ($studentData) {
                        EmailServises::SendEmail($studentData['Email'],"Compte Activated","Your account has been activated ,know you can login to your account in univ boumerdess portal");
                        } 
                    }
                    
                    return(["success" => true,"message" => "Student activation status updated successfully."]);
                } else {
                    return(["success" => false,"message" => "No records was updated. Please check the provided ID."]);
                }
            } else {
                return([
                    "success" => false,
                    "message" => "Failed to execute the query: " . $stmt->error
                ]);
            }
    
            $stmt->close();
    
        } catch (Exception $ex) {
            return([
                "success" => false,
                "message" => "An unexpected error occurred: " . $ex->getMessage()
            ]);
        }
    }

    public static function changeGroup($conn, $id, $group) {
        try {
            $sql = "UPDATE Etudient SET Grp = ? WHERE Id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $group,$id);
            $stmt->execute();
            return ["success" => true, "message" => "The group has been changed successfully."];
        } catch (Exception $ex) {
            return([
                "success" => false,
                "message" => "An unexpected error occurred: " . $ex->getMessage()
            ]);
        }
    }

    public static function changeSection($conn, $id, $section){
        try{
            $sql = "UPDATE etudient set Section = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $section, $id);
            $stmt->execute();
            return(["success" => true ,"message" => "The section has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "seccuss"=> false,
                "message" => "An unexpected error occurred: " . $ex->getMessage()
            ]);
        }
    }

    public static function changeSpeciality($conn, $id, $specialty){
        try{
            $sql = "UPDATE etudient set Specialty = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $specialty, $id);
            $stmt->execute();
            return(["seccess" => true , "message" => "The Specialty has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "seccess" => false,
                "message" => "An unexpected error occurred: " . $ex->getMessage()
            ]);
        }
    }

    public static function changeFirstName($conn, $id, $firstName){
        try{
            $sql = "UPDATE etudient set FirstName = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $firstName, $id);
            $stmt->execute();
            return(["seccess" => true , "message" => "The First Name has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "seccess" => false,
                "message" => "An unexpected error occurred: " . $ex->getMessage()
            ]);
        }
    }

    public static function changeLastName($conn, $id, $lastName){
        try{
            $sql = "UPDATE etudient set LastName = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $lastName, $id);
            $stmt->execute();
            return(["seccess" => true , "message" => "The Last Name has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "seccess" => false,
                "message" => "An unexpected error occurred: " . $ex->getMessage()
            ]);
        }
    }

    public static function changeEmail($conn, $id, $email){
        try{
            $sql = "UPDATE etudient set Email = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $email, $id);
            $stmt->execute();
            return(["seccess" => true , "message" => "The Email has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "seccess" => false,
                "message" => "An unexpected error occurred: " . $ex->getMessage()
            ]);
        }
    }

    public static function changePassword($conn, $id, $password){
        try{
            $sql = "UPDATE etudient set Password = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $password, $id);
            $stmt->execute();
            return(["seccess" => true , "message" => "The PassWord has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "seccess" => false,
                "message" => "An unexpected error occurred: " . $ex->getMessage()
            ]);
        }
    }

    public static function getall($conn) {
        try {
            $sql = "SELECT * FROM etudient";
            $stmt = $conn->prepare($sql);
    
            if (!$stmt) {
                return(["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
                return;
            }
    
            $stmt->execute();
            $result = $stmt->get_result();
    
            $students = [];
            while ($row = $result->fetch_assoc()) {
                $students[] = $row;
            }
    
            return(["success" => true, "students" => $students]);
    
            $stmt->close();
        } catch (Exception $ex) {
            return(["success" => false, "message" => "An error occurred: " . $ex]);
        }
    }  
//----------------------------------


public static function SetRole($conn, $studentId, $role) {
    try {
        if ($role == 'Simple Student') {

          $querydelete = "DELETE FROM StudentRole WHERE StudentId = ?";
            $stmt = $conn->prepare($querydelete);
            $stmt->execute([$studentId]);
        } else {
          
            $query = "INSERT INTO StudentRole (StudentId, Role) 
                      VALUES (?, ?) 
                      ON DUPLICATE KEY UPDATE Role = ?";

            $stmt = $conn->prepare($query);
            $stmt->execute([$studentId, $role, $role]);
        }

        return ["success" => true, "message" => "Student set as $role"];
    } catch (Exception $e) {
        return ["success" => false, "error" => $e->getMessage()];
    }

    
}


public static function getStudentWithRole($conn, $studentId) {
    try {
        $query = "SELECT Role FROM StudentRole WHERE StudentId = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $studentId);
        $stmt->execute();
        $result = $stmt->get_result();
        $studentData = $result->fetch_assoc();
        $role = $studentData ? $studentData['Role'] : "Simple Student";
        
        echo json_encode(["success" => true, "role" => $role]);
        exit;
    } catch (Exception $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
        exit; 
    }
}




}
?>