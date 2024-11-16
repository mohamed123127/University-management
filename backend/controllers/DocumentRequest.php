<?php
class DocumentRequest{
    private $id;
    private $type;
    private $status;
    private $notes;
    private $submissionDate;
    private $lastUpdatedDate;
    private $documentUrl;
    private $studentId;

    public function __construct($type, $status, $notes, $submissionDate, $lastUpdatedDate,$documentUrl,$studentId) {
        $this->type = $type; // تنظيف النصوص
        $this->status = $status;
        $this->notes = $notes;
        $this->submissionDate = $submissionDate;
        $this->lastUpdatedDate = $lastUpdatedDate;
        $this->documentUrl = $documentUrl;
        $this->studentId = $studentId;
    }

    public function Add($conn){
        try{
            $sql = "INSERT INTO documentrequest(`Type`, `Status`, `Notes`, `SubmissionDate`, `LastUpdatedDate`,`DocumentUrl`,`studentId`) VALUES (?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssssi", $this->type, $this->status, $this->notes, $this->submissionDate, $this->lastUpdatedDate,$this->documentUrl,$this->studentId);
            $stmt->execute();
            $stmt->get_result();
            return true;
        }catch(Exception $e) {
            echo json_encode(["success" => false, "message" => "هناك خطأ"]);
        }
    }
}
?>