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

    public static function getByStudentId($conn,$studentId){
        $query = "SELECT n.Id , a.Content , n.IsRead , a.date_time FROM notification n
                  JOIN announcement a ON n.AnnouncementId = a.Id
                  WHERE n.StudentId = ?;";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i",$studentId);
        if (!$stmt) {
            return ["success" => false, "message" => "Database statement preparation failed: " . $conn->error];
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $Notifications = [];
        while ($row = $result->fetch_assoc()) {
            $Notifications[] = $row;
        }
        $stmt->close();
        return ["success" => true, "data" => $Notifications];
    }

    public static function setNotificationAsRead($conn,$studentId){
        $query = "update notification set isRead = true where StudentId = ?" ;
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $studentId);

        if ($stmt->execute()) {
            return ["success" => true, "message" => "notification are marked as read"];
        } else {
            return ["success" => false, "message" => "notification are not read"];
        }
    }
}

?>