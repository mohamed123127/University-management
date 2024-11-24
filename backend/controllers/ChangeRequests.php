<?php
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
    
}

?>