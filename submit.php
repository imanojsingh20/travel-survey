<?php

$issue = json_encode($_POST['issue']);
$rate = $_POST['rate'];
$response = $_POST['response'];
$responsetext = $_POST['responsetext'];
$ans = $_POST['ans'];
$name = $_POST['name'];
$email = $_POST['email'];
$number = $_POST['number'];
$full = $_POST['full'];
$ipaddress = $_SERVER['REMOTE_ADDR'];  


if (!empty($name) || !empty($email) || !empty($number) || !empty($rate) || !empty($response) || !empty($ans)) {
    $host = "https://databases.000webhost.com/";
       $dbUsername = "id13970748_travelhorse";
       $dbPassword = "Anonymous4u@";
       $dbname = "id13970748_survey";
       //create connection
       $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);
       if (mysqli_connect_error()) {
        die('Connect Error('. mysqli_connect_errno().')'. mysqli_connect_error());
       } else {
        $SELECT = "SELECT email From surveydata Where email = ? Limit 1";
        $INSERT = "INSERT Into surveydata (rate, issue, response, responsetext, ans, name, email, number, full, ipaddress) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        //Prepare statement
        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($email);
        $stmt->store_result();
        $rnum = $stmt->num_rows;
        if ($rnum==0) {
         $stmt->close();
         $stmt = $conn->prepare($INSERT);
         $stmt->bind_param("isssssssss", $rate, $issue, $response,$responsetext,$ans,$name,$email,$number,$full,$ipaddress);
         $stmt->execute();
         echo "New record inserted sucessfully";
        } else {
         echo "Someone already register using this email";
        }
        $stmt->close();
        $conn->close();
       }
   } else {
    echo "All field are required";
    die();
   }
?>