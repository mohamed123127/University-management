<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; 

class VRequest{
    private $RequestType;
    private $Status	;
    private $CurrenttValue;
    private $NewValue;
    private $SubmissionDate;
    private $LastUpdaterdDate;
    private $StudentID;


    public function __construct($RequestType,$Status,$CurrenttValue, $NewValue,$SubmissionDate,$LastUpdaterdDate,$StudentID){
        $this->RequestType = $RequestType;
        $this->Status = $Status;
        $this->CurrenttValue = $CurrenttValue;
        $this->NewValue = $NewValue;
        $this->SubmissionDate = $SubmissionDate;
        $this->LastUpdaterdDate = $LastUpdaterdDate;
        $this->StudentID = $StudentID;
    }


    public function Add($conn){
        try{
            $sql = "INSERT INTO virtualrequest(RequestType,Status,CurrenttValue, NewValue,SubmissionDate,LastUpdaterdDate, StudentId) VALUES (?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssssi", $this->RequestType, $this->Status, $this->CurrenttValue, $this->NewValue, $this->SubmissionDate, $this->LastUpdaterdDate, $this->StudentID);
            $stmt->execute();
            $stmt->get_result();
            return true;
        }catch(Exception $e) {
            return(["success" => false, "message" => "هناك خطأ"]);
        }
    }

    public static function UpdateStatus($conn, $Id, $currentStatus) {
        try {
           
            if ($currentStatus == 'pending') {
                $newStatus = 'complete';

                $sql = "UPDATE virtualrequest SET Status = ?, LastUpdatedDate = NOW() WHERE Id = ?";
                $stmt = $conn->prepare($sql); 
                $stmt->bind_param("si", $newStatus, $Id);
    
                $stmt->execute(); 
    
                // التحقق من نجاح التحديث
                if ($stmt->affected_rows > 0) {
                    return ["success" => true, "message" => "تم تحديث الحالة بنجاح"];
                } else {
                    return ["success" => false, "message" => "لم يتم العثور على سجل بهذا المعرف"];
                }
    
                $stmt->close();
                } else {
                
                return ["success" => false, "message" => "لا يمكن التحديث لأن الحالة ليست 'pending'"];
            }
        } catch (Exception $e) {
            
            return ["success" => false, "message" => "حدث خطأ: " . $e->getMessage()];
        }
    }
    

    public static function getall($conn) {
        try {
            $sql = "SELECT * FROM changerequests";
            $stmt = $conn->prepare($sql);
    
            if (!$stmt) {
                return(["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
                
            }
    
            $stmt->execute();
            $result = $stmt->get_result();
    
            $requests = [];
            while ($row = $result->fetch_assoc()) {
                $requests[] = $row;
            }
    
            return(["success" => true, "data" => $requests]);
    
            $stmt->close();
        } catch (Exception $ex) {
            return(["success" => false, "message" => "An error occurred: " . $ex]);
        }
    }

    public static function getById($conn , $id) {
        try {
            $sql = "SELECT * FROM changerequests WHERE StudentId =? ";
           
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
            if (!$stmt) {
                return(["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
                
            }
    
            $stmt->execute();
            $result = $stmt->get_result();
    
            $requests = [];
            while ($row = $result->fetch_assoc()) {
                $requests[] = $row;
            }
    
            return(["success" => true, "data" => $requests]);
    
            $stmt->close();
        } catch (Exception $ex) {
            return(["success" => false, "message" => "An error occurred: " . $ex]);
        }
    }
}

?>