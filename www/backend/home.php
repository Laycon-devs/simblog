<?php
define("SERVERNAME", "localhost");
define("DBNAME", "snipblog");
define("DBUSERNAME", "root");
define("DBPASSWORD", "Olalekan#444");

try {
    $connection = new PDO("mysql:host=" . SERVERNAME . ";dbname=" . DBNAME, DBUSERNAME, DBPASSWORD);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    echo "CONNECTION FAILED" . $e->getMessage();
}

$response = [];

try {
    $query = $connection->prepare("SELECT * FROM posts
    ORDER BY time_created DESC;
    ");
    $query->execute();
    $posts = [];
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        $posts[] = $row;
    }
    $response['success'] = true;
    $response['data'] = $posts;
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = "Something went wrong: " . $e->getMessage();
}

$res = json_encode($response);
echo $res;
