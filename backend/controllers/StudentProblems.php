<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; 

class StudentsProblems {
    private $Id;
    private $Title;
    private $Content;
    private $StudentId;


    public function __construct($StudentId,$Title,$Content){
        $this->StudentId = $StudentId;
        $this->Title = $Title;
        $this->Content = $Content;
    }


public function add($conn) {
    try {
        $sql = "INSERT INTO ReportProblem (StudentId, Title, Content, Date) 
                VALUES (?, ?, ?, CURRENT_TIME())";

        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            return ["success" => false, "message" => "Database statement preparation failed: " . $conn->error];
        }

        // Bind parameters
        $stmt->bind_param("iss", $this->StudentId, $this->Title, $this->Content);

        if ($stmt->execute()) {
            return ["success" => true, "message" => "Problem added successfully."];
        } else {
            return ["success" => false, "message" => "Failed to add problem."];
        }

    } catch (Exception $ex) {
        return ["success" => false, "message" => $ex->getMessage()];
    }
}

public static function gettall($conn){
    try {
        $sql = "SELECT * Password FROM studyverse";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            echo json_encode(["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
            return;
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $Problems = [];
        while ($row = $result->fetch_assoc()) {
            $Problems[] = $row;
        }

        echo json_encode(["success" => true, "problmes" => $Problems]);

        $stmt->close();
    } catch (Exception $ex) {
        echo json_encode(["success" => false, "message" => "An error occurred: " . $ex]);
    }
}
}

?>