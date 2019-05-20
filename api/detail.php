<?php
include "connect.php";//连接数据库
$id=isset($_GET['id'])?$_GET['id']:'';
$sql="select * from goodslist where id=$id";
$res=$conn->query($sql);
$data=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($data,JSON_UNESCAPED_UNICODE);

$res->close();
$conn->close();
?>