<?php

class Repport {
    private $conn;
    private $title;
    private $content;

    public function __construct($conn, $title, $content) {
        $this->conn = $conn;
        $this->title = $title;
        $this->content = $content;
    }

    public function add() {
        $query = "INSERT INTO repport ( title, content) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ss", $this->title, $this->content);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}

?>