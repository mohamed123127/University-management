<?php
session_start();

if (!isset($_SESSION['user'])) {
    header('Location: LoginWithGoogle.php');
    exit();
}

$user = $_SESSION['user'];

echo "<h1>Welcome, {$user['name']}</h1>";
echo "<p>Email: {$user['email']}</p>";
echo "<img src='{$user['picture']}' alt='Profile Picture'>";
echo "<a href='logout.php'>Logout</a>";
?>