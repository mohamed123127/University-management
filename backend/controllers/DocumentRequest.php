<?php
class DocumentRequest{
    private $id;
    private $type;
    private $status;
    private $notes;
    private $submissionDate;
    private $lastUpdatedDate;
    private $documentUrl;

    public function __construct($type, $status, $notes, $submissionDate, $lastUpdatedDate,$documentUrl) {
        $this->type = $type; // تنظيف النصوص
        $this->status = $status;
        $this->notes = $notes;
        $this->submissionDate = $submissionDate;
        $this->lastUpdatedDate = $lastUpdatedDate;
        $this->documentUrl = $documentUrl;
    }

    public function Add($conn){
        try{
            $sql = "INSERT INTO documentrequest(`Type`, `Status`, `Notes`, `SubmissionDate`, `LastUpdatedDate`,`DocumentUrl`) VALUES (?,?,?,?,?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssss", $this->type, $this->status, $this->notes, $this->submissionDate, $this->lastUpdatedDate,$this->documentUrl);
            $stmt->execute();
            $stmt->get_result();
            echo json_encode(["success" => true, "message" => "Student Added successfuly"]);
        }catch(Exception $e) {
            echo json_encode(["success" => false, "message" => "هناك خطأ"]);
        }
    }
}
?>