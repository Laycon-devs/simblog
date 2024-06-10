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

$response = [];

try {
    // Fetch admin data
    $query = $connection->prepare("SELECT * FROM admin WHERE admin_id = :aid");
    $query->bindParam(":aid", $_POST['admin_id']);
    $query->execute();
    $row = $query->fetch(PDO::FETCH_ASSOC);

    // Fetch category data
    $categoryQuery = $connection->prepare("SELECT * FROM category");
    $categoryQuery->execute();
    $categories = [];
    while ($categoryRow = $categoryQuery->fetch(PDO::FETCH_ASSOC)) {
        $categories[] = $categoryRow;
    }
    $response['success'] = true;
    $response['data'] = $row;
    $response['categories'] = $categories;
} catch (Exception $e) {
    $response['failed'] = "Someting went wrong, try again" . $e->getMessage();
}
$res = json_encode($response);
echo $res;