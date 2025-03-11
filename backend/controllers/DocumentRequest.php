<?php
require_once '../utils/WebServices/EmailServices.php';
require_once '../controllers/Etudient.php'; 


class DocumentRequest
{
    private $type;
    private $status;
    private $notes;
    private $submissionDate;
    private $lastUpdatedDate;
    private $documentUrl;
    private $studentId;

    public function __construct($type, $status, $notes, $submissionDate, $lastUpdatedDate, $documentUrl, $studentId)
    {
        $this->type = $type;
        $this->status = $status;
        $this->notes = $notes;
        $this->submissionDate = $submissionDate;
        $this->lastUpdatedDate = $lastUpdatedDate;
        $this->documentUrl = $documentUrl;
        $this->studentId = $studentId;
    }

    public function add($conn)
    {
        try {
            $sql = "INSERT INTO DocumentRequest(Type, Status, Notes, SubmissionDate, LastUpdatedDate, DocumentUrl, studentId) VALUES (?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssssi", $this->type, $this->status, $this->notes, $this->submissionDate, $this->lastUpdatedDate, $this->documentUrl, $this->studentId);
            $stmt->execute();
            $stmt->get_result();
            return true;
        } catch (Exception $e) {
            echo json_encode(["success" => false, "message" => "هناك خطأ"]);
        }
    }

    public static function getall($conn)
    {
        try {
            $sql = "SELECT documentrequest.*, etudient.EducationYear
                    FROM documentrequest
                    INNER JOIN etudient ON documentrequest.studentId = etudient.Id
                    ORDER BY 
                    CASE 
                        WHEN documentrequest.Status = 'Completed' THEN 1  -- ضع القيم المكتملة في النهاية
                        WHEN documentrequest.Status = 'Rejected' THEN 2  -- ضع المرفوضة في المنتصف
                        ELSE 0  -- ضع أي حالة أخرى في البداية
                    END,
                        documentrequest.SubmissionDate DESC;
                    ";
            $stmt = $conn->prepare($sql);

            if (!$stmt) {
                echo json_encode(["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
                return;
            }

            $stmt->execute();
            $result = $stmt->get_result();

            $Documents = [];
            while ($row = $result->fetch_assoc()) {
                $Documents[] = $row;
            }
            //echo (json_encode($Documents));
            if ($Documents != []) {
                
                return ["success" => true, "data" => $Documents];
            } else {
                return ["success" => false, "message" => "No DAta"];
            }

            $stmt->close();
        } catch (Exception $ex) {
            return ["success" => false, "message" => "An error occurred: " . $ex];
        }
    }
    public static function getById($conn , $id) {
        try {
            $sql = "SELECT * FROM documentrequest WHERE StudentId =? ORDER BY `LastUpdatedDate` DESC";
           
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

    public static function UpdateStatus($conn, $id, $newStatus,$studentId)
    {
        try {
            $sql = "UPDATE DocumentRequest SET Status = ?, LastUpdatedDate = NOW() WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $newStatus, $id);

            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                if($newStatus == "Completed"){
                    //echo($id);
                    $studentData = Etudient::getById($conn,$studentId);
                    //echo $studentData;
                    if ($studentData) {
                    EmailServises::SendEmail($studentData['Email'], "Request ready","your request has been ready to take");
                    }
                }
                return (["success" => true, "message" => "Status updated successfully"]);
            } else {
                return (["success" => false, "message" => "No record found with that ID"]);
            }

            $stmt->close();
        } catch (Exception $e) {
            return (["success" => false, "message" => "An error occurred: " . $e->getMessage()]);
        }
    }

    public static function addNote($conn, $id, $note){
        try {
            $sql = "UPDATE DocumentRequest SET Notes = ?, LastUpdatedDate = NOW() WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $note, $id);

            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                return (["success" => true, "message" => "notes updated successfully"]);
            } else {
                return (["success" => true, "message" => "No rows has affected"]);
            }

            $stmt->close();
        } catch (Exception $e) {
            return (["success" => false, "message" => "An error occurred: " . $e->getMessage()]);
        }
    }
}