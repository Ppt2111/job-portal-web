<?php
// Connect to database
include '../db-connect.php';

// Allow CORS for localhost frontend
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight (OPTIONS request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get posted data
$data = json_decode(file_get_contents("php://input"), true);

// Debug: Check if data is received
if (!$data) {
    echo json_encode(["message" => "No data received"]);
    exit;
}

// Check if required fields are set
if (!isset($data['name'], $data['email'], $data['password'], $data['role'])) {
    echo json_encode(["message" => "Missing required fields"]);
    exit;
}

$name = trim($data['name']);
$email = trim($data['email']);
$password = $data['password']; // Store raw password for validation
$role = trim($data['role']);

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["message" => "Invalid email format"]);
    exit;
}

// Hash password securely
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Prepare SQL statement
$sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["message" => "Database error", "error" => $conn->error]);
    exit;
}

$stmt->bind_param("ssss", $name, $email, $hashedPassword, $role);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["message" => "User created successfully"]);
} else {
    echo json_encode(["message" => "Error inserting user", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
exit;
?>
