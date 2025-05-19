<?php
require_once '../controllers/Notification.php'; 
require_once '../controllers/Etudient.php'; 

class Announcement {
    private $conn;
    private $id;
    private $title;
    private $content;
    private $date_time;
    
    public function __construct($conn, $title, $content) {
        $this->conn = $conn;
        $this->title = $title;
        $this->content = $content;
    }

    public function add($recipient){
        if(is_numeric($recipient)){
            return $this->addOne($recipient);
        }else{
            return $this->AddMany($recipient);
        }
    }

    public function addOne($studentId) {
        $query = "INSERT INTO announcement (title, content , date_time) VALUES (?, ? ,Now())";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ss",$this->title, $this->content);

        if ($stmt->execute()) {
            $announcementId = $this->conn->insert_id;
            $notification = new Notification($this->conn,$announcementId,$studentId);
            $response =  $notification->add();   
            if($response['success']){
                return ["success" => true, "message" => "Announcment added successfully."];
            }else{
                return ["success" => false, "message" => "Announcment does't added."];
            }
        } else {
            return ["success" => false, "message" => "Student does't added."];
        }
    }

    public function AddMany($recipient){
        $query = "INSERT INTO announcement (title, content , date_time) VALUES (?, ? ,Now())";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ss",$this->title, $this->content);

        if ($stmt->execute()) {
            $announcementId = $this->conn->insert_id;

            switch($recipient){
                case 'Licence 1':
                    $studentsId = Etudient::getByEducationYear($this->conn, "Licence 1");
                    
                    foreach ($studentsId as $value) {
                        $notification = new Notification($this->conn,$announcementId,$value);
                        $response =  $notification->add();   
                    }
                    if($response['success']){
                        return ["success" => true, "message" => "Announcment added successfully."];
                    }else{
                        return ["success" => false, "message" => "Announcment does't added."];
                    }
                    break;                
                case 'Licence 2':
                    $studentsId = Etudient::getByEducationYear($this->conn,"Licence 2");
                    foreach ($studentsId as $value) {
                        $notification = new Notification($this->conn,$announcementId,$value);
                        $response =  $notification->add();   
                    }
                    if($response['success']){
                        return ["success" => true, "message" => "Announcment added successfully."];
                    }else{
                        return ["success" => false, "message" => "Announcment does't added."];
                    }
                break;
                case 'Licence 3':
                    $studentsId = Etudient::getByEducationYear($this->conn,"Licence 3");
                    foreach ($studentsId as $value) {
                        $notification = new Notification($this->conn,$announcementId,$value);
                        $response =  $notification->add();   
                    }
                    if($response['success']){
                        return ["success" => true, "message" => "Announcment added successfully."];
                    }else{
                        return ["success" => false, "message" => "Announcment does't added."];
                    }
                break;
                case 'Master 1':
                    $studentsId = Etudient::getByEducationYear($this->conn,"Master 1");
                    foreach ($studentsId as $value) {
                        $notification = new Notification($this->conn,$announcementId,$value);
                        $response =  $notification->add();   
                    }
                    if($response['success']){
                        return ["success" => true, "message" => "Announcment added successfully."];
                    }else{
                        return ["success" => false, "message" => "Announcment does't added."];
                    }
                break;
                case 'Master 2':
                    $studentsId = Etudient::getByEducationYear($this->conn,"Master 2");
                    foreach ($studentsId as $value) {
                        $notification = new Notification($this->conn,$announcementId,$value);
                        $response =  $notification->add();   
                    }
                    if($response['success']){
                        return ["success" => true, "message" => "Announcment added successfully."];
                    }else{
                        return ["success" => false, "message" => "Announcment does't added."];
                    }
                break;
                case 'All':
                    $studentsId = Etudient::getAllId($this->conn);
                    foreach ($studentsId as $value) {
                        $notification = new Notification($this->conn,$announcementId,$value);
                        $response =  $notification->add();   
                    }
                    if($response['success']){
                        return ["success" => true, "message" => "Announcment added successfully."];
                    }else{
                        return ["success" => false, "message" => "Announcment does't added."];
                    }
                break;
                default:
                    $response = ["success" => false, "message" => "Invalid recipient"];
                break;
            }
        } else {
            return ["success" => false, "message" => "Student does't added."];
        }
    }
}

?>