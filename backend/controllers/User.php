<?php
header("Access-Control-Allow-Origin: *");
    class User{
        protected $id;
        protected $email;
        protected $password;
        protected $isActive;

        public function __construct( $email, $password, $isActive) {
            $this->email = $email;
            $this->password = $password;
            $this->isActive = $isActive;
        }
    }
?>