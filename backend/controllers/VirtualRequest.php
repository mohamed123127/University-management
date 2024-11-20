<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// السماح بالهيدر Content-Type
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php'; 

class VRequest{
    private $Sender;
    private $Title;
    private $Content;
    private $Date;


    public function __construct($Sender,$Title,$Content,$Date){
        $this->Sender = $Sender;
        $this->Title = $Title;
        $this->Content = $Content;
        $this->Date = $Date;
    }
}

?>