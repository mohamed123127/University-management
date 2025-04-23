<?php
require_once '../config/database.php'; 
require_once '../controllers/Etudient.php';

class ChangeRequests{
    private $id;
    private $type;
    private $status;
    private $newValue1;
    private $newValue;
    private $submissionDate;
    private $lastUpdatedDate;
    private $studentId;
    private $matricule1; 
    private $matricule2; 

    public function __construct($type, $newValue1, $newValue2, $studentId, $matricule1, $matricule2) {
        $this->type = $type;
        $this->newValue1 = $newValue1;
        $this->newValue2 = $newValue2;
        $this->studentId = $studentId;
        $this->matricule1 = $matricule1; 
        $this->matricule2 = $matricule2; 
    }

    public function add($conn) {
        try {
            $sql = "INSERT INTO changerequests (
                Type, Status, NewValue1, Matricule1, Matricule2, NewValue2, SubmissionDate, LastUpdatedDate, StudentId
            ) VALUES (?, 'en attend', ?, ?, ?, ?, NOW(), NOW(), ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", 
        $this->type,         
        $this->newValue1,    
        $this->matricule1,   
        $this->matricule2,   
        $this->newValue2,    
        $this->studentId     
    );
    
    $stmt->execute();
    

            return ["success" => true, "message" => "change request was added"];
        } catch (Exception $e) {
            return ["success" => false, "message" => "هناك خطأ", "error" => $e->getMessage()];
        }
    }


    public static function getAll($conn){
        try{
            $sql = "SELECT changerequests.Id, `Matricule`, `FirstName` , `LastName` , `EducationYear` , `Type`, `OldValue`, `NewValue`, `SubmissionDate`, `LastUpdatedDate`,`Status` FROM `Changerequests` 
                    INNER JOIN etudient ON changerequests.StudentId = etudient.Id";
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

            return (["success" => true, "data" => $Admins]);
        }catch(Exception $e){
            return ["success" => false, "message" => "هناك خطأ","error: " => $e->getMessage()];
        }
    }
    
    public static function accepteRequest($conn,$requestId,$requestType,$newValue,$studentId){
        try{
            switch($requestType){
                case 'Group':
                    Etudient::changeGroup($conn,$studentId,$newValue);
                break;
                case 'Section':
                    Etudient::changeSection($conn, $studentId, $newValue);
                break;
                case 'Speciality':
                    Etudient::changeSpeciality($conn, $studentId, $newValue);
                break;
                case 'First Name':
                    Etudient::changeFirstName($conn, $studentId, $newValue);
                break;
                case 'Last name':
                    Etudient::changeLastName($conn, $studentId, $newValue);
                break;
                case 'Email':
                    Etudient::changeEmail($conn, $studentId, $newValue);
                break;
                case 'Password':
                    Etudient::changePassword($conn, $studentId, $newValue);
                break;
            }
            self::completeRequest($conn,$requestId);
            return ["success" => true, "message" => "The request has been completed successfully."];
        }catch(Exception $e){
            return ["success" => false, "message" => "هناك خطأ","error: " => $e->getMessage()];
        }
    }

    public static function refusedRequest($conn,$requestId){
        try{
            $sql = "UPDATE changerequests SET Status = 'Rejected', LastUpdatedDate = NOW() WHERE Id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $requestId);
            $stmt->execute();            return ["success" => true, "message" => "The request has been refused successfully."];
        }catch(Exception $e){
            return ["success" => false, "message" => "هناك خطأ","error: " => $e->getMessage()];
        }
    }

    private static function completeRequest($conn,$requestId){
        try{
            $sql = "UPDATE changerequests SET Status = 'Completed', LastUpdatedDate = NOW() WHERE Id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $requestId);
            $stmt->execute();
            return ["success" => true, "message" => "The request has been completed successfully."];
        }catch(Exception $e){
            
        }
    }
}

?>