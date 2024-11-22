<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; 

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
            $sql = "INSERT INTO changerequests(Type, Status, OldValue, NewValue, SubmissionDate, LastUpdatedDate, StudentId) VALUES (?,?,?,?,DATE_FORMAT(NOW(), '%d/%m/%Y'),DATE_FORMAT(NOW(), '%d/%m/%Y'),?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssi", $this->type, $this->status, $this->oldValue, $this->newValue, $this->studentId);
            $stmt->execute();
            $stmt->get_result();
            return true;
        }catch(Exception $e) {
            echo json_encode(["success" => false, "message" => "هناك خطأ"]);
        }
    }
    
}

?>