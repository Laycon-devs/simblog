<?php
define("SERVERNAME", "localhost");
define("DBNAME", "snipblog");
define("DBUSERNAME", "root");
define("DBPASSWORD", "Olalekan#444");

try {
    $connection = new PDO("mysql:host=" . SERVERNAME . ";dbname=" . DBNAME, DBUSERNAME, DBPASSWORD);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "CONNECTED SUCCESSFULLY";
} catch (PDOException $e) {
    echo "CONNECTION FAILED" . $e->getMessage();
}
$json = file_get_contents("php://input");
$post = json_decode($json, true);
// print_r($post);
// die();
$response = [];
try {
    $query = $connection->prepare("SELECT * FROM admin WHERE email = :em");
    $query->bindParam(":em", $post['email']);
    $query->execute();
    $response['success'] = true;
    $row = $query->fetch(PDO::FETCH_ASSOC);
    if ($query->rowCount() > 0 && $post['password'] === $row['password']) {
        $response['pass'] = true;
        $response['data'] = $row;
    }else{
        $response['error'] = "Account Not Found";
    }
} catch (Exception $e) {
    $response['failed'] = "Something went wrong, try again" . $e->getMessage();
}
$res = json_encode($response);
echo $res;
