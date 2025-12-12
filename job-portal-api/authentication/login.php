<?php
//connect to db
include '../db-connect.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

//get posted data
$data = json_decode(file_get_contents("php://input"));

//check if data is not empty
if(isset($data['email'], $data['password'])){
    $email = $data['email'];
    $password = $data['password'];

    //get user from db
    $sql = "SELECT * FROM User WHERE email = '$email'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        $user = $result->fetch_assoc();
        if(password_verify($password, $user['password'])){
            echo json_encode(["message" => "Login successful", "user" => $user]);
        }else{
            echo json_encode(["message" => "Invalid email or password"]);
        }
    }else{
        echo json_encode(["message" => "Invalid email or password"]);
    }
}
?>