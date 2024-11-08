<?php
header("Access-Control-Allow-Origin: *");
require_once '../controllers/User.php'; // تأكد من تضمين User.php بشكل صحيح

class Etudient extends User {
    private $_matricule;
    private $_faculty;
    private $EducationYear;
    private $_Specialty;
    private $_section;
    private $_group;

    public function __construct($id, $email, $password, $isActive, $matricule, $faculty, $EducationYear, $Specialty, $section, $group) {
        parent::__construct($id, $email, $password, $isActive);
        $this->_matricule = $matricule;
        $this->_faculty = $faculty;
        $this->EducationYear = $EducationYear;
        $this->_Specialty = $Specialty;
        $this->_section = $section;
        $this->_group = $group;
    }

    public static function isExistEtudient($conn, $email, $password) {
        $sql = "SELECT * FROM Etudient WHERE email = ? AND password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $etudient = $result->fetch_assoc();
            if ($etudient['Active']) {
                return $etudient;
            }
        }
        return null;
    }

    
}
?>
