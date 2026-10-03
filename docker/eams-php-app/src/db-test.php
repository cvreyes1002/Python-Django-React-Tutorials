<?php
$host = 'mysql';
$username = 'root';
$password = 'password';
$database = 'my_app_db';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully to MySQL!";
?>