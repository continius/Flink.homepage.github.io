<?php
ini_set('display_errors', 0); // Отключаем вывод ошибок

$servername = "MySQL-8.0";
$username = "root";
$password = "";
$dbname = "Flink.data.base";

$conn = new mysqli("MySQL-8.0", "root", "","Flink.base.data");

// Проверка соединения
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

// Проверка на корректность входных данных
if (!isset($data['title']) || !isset($data['description']) || !isset($data['image'])) {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
    exit();
}

$title = $conn->real_escape_string($data['title']);
$description = $conn->real_escape_string($data['description']);
$image = $conn->real_escape_string($data['image']); // Изображение в формате base64

$sql = "INSERT INTO posts (title, description, image) VALUES ('$title', '$description', '$image')";

if ($conn->query($sql) === TRUE) {
    $response = ['success' => true];
} else {
    $response = ['success' => false, 'error' => 'Database query failed'];
}

// Кодирование ответа в JSON
$json = json_encode($response);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'error' => 'JSON encoding error']);
    exit();
}

echo $json;
$conn->close();
?>