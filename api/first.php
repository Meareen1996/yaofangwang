<?php
//渲染首页选项卡
include_once("connect.php");//连接数据库
$leiid=isset($_GET['leiid'])?$_GET['leiid']:'';
$sql="select*from index_database WHERE lei_id=$leiid";
$res=$conn->query($sql);
$data=$res->fetch_all(MYSQLI_ASSOC);

echo json_encode($data,JSON_UNESCAPED_UNICODE);

$res->close();
$conn->close();
?>