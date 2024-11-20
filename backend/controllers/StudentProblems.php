<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; 

class StudentsProblems {
    private $Sender;
    private $Title;
    private $Content;


    public function __construct($Sender,$Title,$Content){
        $this->Sender = $Sender;
        $this->Title = $Title;
        $this->Content = $Content;
    }


public function addProblem($conn) {
    try {
        $sql = "INSERT INTO studyverse (Sender, Title, Content, Date) 
                VALUES (?, ?, ?, CURRENT_TIME())";

        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            echo json_encode(["success" => false, "message" => "Database statement preparation failed: " . $conn->error]);
            return;
        }

        // Bind parameters
        $stmt->bind_param("ssss", $this->Sender, $this->Title, $this->Content);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Problem added successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to add problem."]);
        }

    } catch (Exception $ex) {
        echo json_encode(["success" => false, "message" => $ex->getMessage()]);
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