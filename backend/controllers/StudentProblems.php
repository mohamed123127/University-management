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
    private $Email;


    public function __construct($Email,$Title,$Content){
        $this->Email = $Email;
        $this->Title = $Title;
        $this->Content = $Content;
    }


public function add($conn) {
    try {
        $sql = "INSERT INTO ReportProblem (Email, Title, Content, Date) 
                VALUES (?, ?, ?, CURRENT_TIME())";

        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            return ["success" => false, "message" => "Database statement preparation failed: " . $conn->error];
        }

        // Bind parameters
        $stmt->bind_param("sss", $this->Email, $this->Title, $this->Content);

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
        $sql = "SELECT * FROM ReportProblem";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            return ["success" => false, "message" => "Database statement preparation failed: " . $conn->error];
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $Problems = [];
        while ($row = $result->fetch_assoc()) {
            $Problems[] = $row;
        }
        $stmt->close();
        return ["success" => true, "problmes" => $Problems];
    } catch (Exception $ex) {
        return ["success" => false, "message" => "An error occurred: " . $ex];
    }
}
}

?>