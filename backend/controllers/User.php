<?php
header("Access-Control-Allow-Origin: *");
    class User{
        protected $id;
        protected $email;
        protected $password;
        protected $firstName;
        protected $lastName;
   

        public function __construct( $firstName,$lastName,$email, $password) {
            $this->firstName = $firstName;
            $this->lastName = $lastName;
            $this->email = $email;
            $this->password = $password;
        }
    }
?>