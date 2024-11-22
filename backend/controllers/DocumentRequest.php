<?php 
class DocumentRequest {
    private $type;
    private $status;
    private $notes;
    private $submissionDate;
    private $lastUpdatedDate;
    private $documentUrl;
    private $studentId;

    public function __construct($type, $status, $notes, $submissionDate, $lastUpdatedDate, $documentUrl, $studentId) {
        $this->type = $type;
        $this->status = $status;
        $this->notes = $notes;
        $this->submissionDate = $submissionDate;
        $this->lastUpdatedDate = $lastUpdatedDate;
        $this->documentUrl = $documentUrl;
        $this->studentId = $studentId;
    }

    public function add($conn){
        try{
            $sql = "INSERT INTO DocumentRequest(Type, Status, Notes, SubmissionDate, LastUpdatedDate, DocumentUrl, studentId) VALUES (?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssssi", $this->type, $this->status, $this->notes, $this->submissionDate, $this->lastUpdatedDate, $this->documentUrl, $this->studentId);
            $stmt->execute();
            $stmt->get_result();
            return true;
        }catch(Exception $e) {
            echo json_encode(["success" => false, "message" => "هناك خطأ"]);
        }
    }

    public function getall($conn) {
        try {
            $sql = "SELECT * FROM documentrequest";
            $stmt = $conn->prepare($sql);
    
            if (!$stmt) {
                echo json_encode(["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
                return;
            }
    
            $stmt->execute();
            $result = $stmt->get_result();
    
            $docs = [];
            while ($row = $result->fetch_assoc()) {
                $docs[] = $row;
            }
    
            echo json_encode(["success" => true, "students" => $docs]);
    
            $stmt->close();
        } catch (Exception $ex) {
            echo json_encode(["success" => false, "message" => "An error occurred: " . $ex]);
        }
    }
    
    public function UpdateStatus($conn, $id) {
        try {
            // Check if the current status is 'pending'
            if ($this->status == 'pending') {
                $newStatus = 'complete';  // Set the new status to 'complete'
                
                $sql = "UPDATE DocumentRequest SET Status = ?, LastUpdatedDate = NOW() WHERE id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("si", $newStatus, $id);
                
                $stmt->execute();

                if ($stmt->affected_rows > 0) {
                    echo json_encode(["success" => true, "message" => "Status updated successfully"]);
                } else {
                    echo json_encode(["success" => false, "message" => "No record found with that ID"]);
                }

                $stmt->close();
            } else {
                echo json_encode(["success" => false, "message" => "Status is not 'pending', cannot update"]);
            }
        } catch (Exception $e) {
            echo json_encode(["success" => false, "message" => "An error occurred: " . $e->getMessage()]);
        }
    }
}
?>