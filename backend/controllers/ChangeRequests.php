<?php
require_once '../config/database.php'; 
require_once '../controllers/Etudient.php';

class ChangeRequests{
    private $id;
    private $type;
    private $status;
    private $oldValue;
    private $newValue;
    private $submissionDate;
    private $lastUpdatedDate;
    private $studentId;


    public function __construct($type,$oldValue,$newValue,$studentId){
        $this->type = $type;
        $this->oldValue = $oldValue;
        $this->newValue = $newValue;
        $this->studentId = $studentId;
    }

    public function add($conn){
        try{
            $sql = "INSERT INTO changerequests(Type, Status, OldValue, NewValue, SubmissionDate, LastUpdatedDate, StudentId) VALUES (?,'en attend',?,?,NOW(),NOW(),?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssi", $this->type, $this->oldValue, $this->newValue, $this->studentId);
            $stmt->execute();
            //$stmt->get_result();
            return ["success" => true, "message" => "change request was added"];
        }catch(Exception $e) {
            return ["success" => false, "message" => "هناك خطأ","error: " => $e->getMessage()];
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
                default:
                return ["success" => true, "message" => "The request has been refused"];
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
            self::completeRequest($conn,$requestId);
            return ["success" => true, "message" => "The request has been refused successfully."];
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