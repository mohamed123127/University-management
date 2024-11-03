<?php
    class User{
        private $id;
        private $email;
        private $password;
        private $isActive;

        public function __construct($id, $email, $password, $isActive) {
            $this->id = $id;
            $this->email = $email;
            $this->password = $password;
            $this->isActive = $isActive;
        }
    }
?>