<?php
ini_set('display_errors', 0);

$servername = "MySQL-8.0";
$username = "root";
$password = "";
$dbname = "Flink.base.data";

$conn = new mysqli("MySQL-8.0", "root", "","Flink.base.data");

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit();
}

$sql = "SELECT title, description, image FROM posts";
$result = $conn->query($sql);

$posts = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
}

echo json_encode(['success' => true, 'posts' => $posts]);

$conn->close();
?>