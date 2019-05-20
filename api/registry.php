<?php
//设置编码
header('content-type:text/html;charset=utf-8');
include 'connect.php';
//接收数据
$user=isset($_POST['user'])?($_POST['user']):'';
$password=isset($_POST['password'])?($_POST['password']):'';
$phone=isset($_POST['phone'])?($_POST['phone']):'';
$name=isset($_POST['name'])?($_POST['name']):'';
$email=isset($_POST['email'])?($_POST['email']):'';
// 连接数据库

$sql="insert into register (user,password,phone,name,email) values('$user','$password','$phone','$name','$email')";
$res = $conn->query($sql);
if($res){
    echo "yes";
}else{
    echo "no";
}
$conn->close();
?>