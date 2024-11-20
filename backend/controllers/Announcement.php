<?php

class Announcement {
    private $conn;
    private $recipient;
    private $title;
    private $content;

    public function __construct($conn, $recipient, $title, $content) {
        $this->conn = $conn;
        $this->recipient = $recipient;
        $this->title = $title;
        $this->content = $content;
    }

    public function add() {
        $query = "INSERT INTO announcements (recipient, title, content) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sss", $this->recipient, $this->title, $this->content);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}

?>