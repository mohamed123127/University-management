<?php

class Notification {
    private $conn;
    private $id;
    private $isRead;
    private $announcementId;
    private $studentId;
    
    public function __construct($conn, $announcementId, $studentId) {
        $this->conn = $conn;
        $this->announcementId = $announcementId;
        $this->studentId = $studentId;
    }

    public function add(){
        $query = "INSERT INTO notification (IsRead, AnnouncementId , StudentId) VALUES (false, ? ,?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ii",$this->announcementId, $this->studentId);

        if ($stmt->execute()) {

            return ["success" => true, "message" => "notification added successfully."];
        } else {
            return ["success" => false, "message" => "notification does't added."];
        }
    }

}

?>