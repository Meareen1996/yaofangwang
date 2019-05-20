<?php
include"connect.php";//连接数据库
$cid=isset($_POST['cid'])?($_POST['cid']):'';
$sql="select * from order_form where cid='$cid'"; //渲染购物车
$res=$conn->query($sql);
$data=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($data,JSON_UNESCAPED_UNICODE);
$conn->close();
$res->close();

?>