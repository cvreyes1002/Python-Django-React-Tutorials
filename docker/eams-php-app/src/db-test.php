<?php
$host = 'mysql';
$username = 'root';
$password = 'password';
$database = 'attendance_system';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully to MySQL!";
?>