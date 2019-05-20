<?php
include 'connect.php';
// 验证用户名可不可用
$userName=isset($_GET["userName"])?($_GET["userName"]):'';
$phone=isset($_GET["phone"])?($_GET["phone"]):'';
$sql="SELECT * from register where user='$userName'";//查找手机号
$res=$conn->query($sql);//执行语句
$exist=$res->num_rows;//判断存在的数量
if($exist){
    echo "no";//不能注册
}else{
    echo "yes";//可以注册
}
$res->close();
$conn->close();
?>