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
    private $educationYear;
    private $specialty;
    private $section;
    private $group;
    private $phoneNumber;
  
    private $isActive;


    public function __construct($firstName, $lastName, $email, $password, $isActive, $matricule, $educationYear, $specialty, $section, $group,$phoneNumber) {
        parent::__construct($firstName,$lastName,$email, $password);
        $this->matricule = $matricule;
        $this->educationYear = $educationYear;
        $this->specialty = $specialty;
        $this->section = $section;
        $this->group = $group;
        $this->phoneNumber = $phoneNumber;
        $this->isActive = $isActive;
    }
    public static function isExistEtudient($conn, $matricule, $password) {
        $sql = "SELECT `Id`, `Active` FROM etudient WHERE Matricule = ? AND password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $matricule, $password);
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
    public static function isExistEtudient_matricule($conn, $matricule,$detailed=false) {
        $sql = "SELECT `Id` FROM etudient WHERE Matricule = ? ";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $matricule);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            if($detailed){
                $etudient = $result->fetch_assoc();
                $StudentId = $etudient['Id'];
                return ["success" => true, "message" => "User exists",'id' => $StudentId];
            }else{
                return true;
            }
            
        }else{
            if( $detailed ) return ["success" => false, "message" => "Invalid email or password"];
            else return false;
        }
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
      try {
		$sql = "INSERT INTO  etudient ( matricule , firstName , lastName  , educationYear, Speciality, section, grp , email, password,PhoneNumber, Active,isNew) 
                VALUES ( ?,?, ?, ?, ?, ?, ?, ?, ?,?, 1,1)";
                $stmt = $conn->prepare($sql);
                if (!$stmt) {
                    return ["success" => false, "message" => "Database statement preparation failed: " . $conn->error];
                }
    
                $stmt->bind_param("ssssssssssi", $this->matricule, $this->firstName, $this->lastName, $this->educationYear, $this->specialty, $this->section, $this->group, $this->email, $this->phoneNumber, $this->password, $this->isActive);
    

                if ($stmt->execute()) {
                    return ["success" => true, "message" => "Student added successfully."];
                } else {
                    return ["success" => false, "message" => "Failed to add student. Error: " . $stmt->error];
                }
            } else {
                return ["success" => false, "message" => "This email is already used"];
            }
        } catch (Exception $ex) {
            return ["success" => false, "message" => "Error: " . $ex->getMessage()];
        }
    }

    public function updateStudent($conn) {
        try {    
            $sql = "UPDATE etudient SET firstName = ?, lastName = ?, educationYear = ?, Speciality = ?, section = ?, grp = ?,email = ?, password = ?,PhoneNumber = ?, Active = true,isNew = true WHERE Matricule=?";
            if (!($stmt = $conn->prepare($sql))) return ["success" => false, "message" => "Database statement preparation failed: " . $conn->error];
    
            $stmt->bind_param("ssssssssss",  $this->firstName, $this->lastName, $this->educationYear, $this->specialty, $this->section, $this->group, $this->email, $this->password,$this->phoneNumber,$this->matricule);
            return $stmt->execute() ? ["success" => true, "message" => "Student updated successfully."] : ["success" => false, "message" => "Failed to update student."];
        } catch (Exception $ex) {
            return ["success" => false, "message" => $ex->getMessage()];
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
            return(["success" => true , "message" => "The Specialty has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "success" => false,
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
            return(["success" => true , "message" => "The First Name has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "success" => false,
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
            return(["success" => true , "message" => "The Last Name has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "success" => false,
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
            return(["success" => true , "message" => "The Email has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "success" => false,
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
            return(["success" => true , "message" => "The PassWord has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "success" => false,
                "message" => "An unexpected error occurred: " . $ex->getMessage()
            ]);
        }
    }

    public static function changeIsNewValue($conn, $id, $isNew = 0){
        try{
            $sql = "UPDATE etudient set isNew = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ii", $isNew, $id);
            $stmt->execute();
            return(["success" => true , "message" => "isNew value has been changed successfully."]);
        } catch (Exception $ex){
            return([
                "success" => false,
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
public static function getStudentsRole($conn  ) {
    try {
        $query = "SELECT StudentId , Role FROM StudentRole ";
        $stmt = $conn->prepare($query);
     
        $stmt->execute();
       
        $result = $stmt->get_result();
    
        $studentsRole = [];
        while ($row = $result->fetch_assoc()) {
            $studentsRole[] = $row;
        }

        echo json_encode(["success" => true, "studentsRole" => $studentsRole]);
        exit;
    }
}

public static function DeleteAllStudents($conn){
    try {
        $query = "DELETE FROM etudient";
        $stmt = $conn->prepare($query);
        if ($stmt->execute()) {
           
            return(["success" => true, "message" => "Students Deleted successfully."]);
        } else {
            return(["success" => false, "message" => "Failed to delete students."]);
        }
       
    } catch (Exception $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
        exit; 
    }
}
}
?>