<?php
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
            $sql = "SELECT * FROM documentrequest";
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

    public static function UpdateStatus($conn, $id, $newStatus)
    {
        try {
            $sql = "UPDATE DocumentRequest SET Status = ?, LastUpdatedDate = NOW() WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $newStatus, $id);

            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                return (["success" => true, "message" => "Status updated successfully"]);
            } else {
                return (["success" => false, "message" => "No record found with that ID"]);
            }

            $stmt->close();
        } catch (Exception $e) {
            return (["success" => false, "message" => "An error occurred: " . $e->getMessage()]);
        }
    }
}