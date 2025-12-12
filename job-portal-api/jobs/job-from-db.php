<?php
// Allow requests from any domain (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

//Get jobs from database
include 'db-connect.php';

$sql = "SELECT * from Job";
$result = $conn->query($sql);
$jobs = [];
//if there are jobs in db, add it in job array as associative
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $jobs[] = $row;
    }
}
//turn jobs array into json format
echo json_encode($jobs);
?>