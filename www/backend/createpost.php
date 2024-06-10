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

$response = [];

try {
    $query = $connection->prepare("INSERT INTO posts VALUES(NULL, :pa, :pt, :pc, :cid, NOW(), NOW())");
$data = [
    ":pa" => $post['postAuthor'],
    ":pt" => $post['postTitle'],
    ":pc" => $post['postContent'],
    ":cid" => $post['postCategory'],
];
$query->execute($data);
$response['success'] = true;
$response['success_msg'] = "Posted successfully";
} catch (Exception $e) {
    $response['failed'] = "Something went wrong, failed to post";
}
$res = json_encode($response);
echo $res;