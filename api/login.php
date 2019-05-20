<?php
//设置编码
header('content-type:text/html;charset=utf-8');
include 'connect.php';// 连接数据库
$username=isset($_POST['user'])?($_POST['user']):'13348752312';
$psw=isset($_POST['psw'])?($_POST['psw']):'qqqqqq';
$sendtype=isset($_POST['sendtype'])?($_POST['sendtype']):'';
if($sendtype=="yonghuming"){
    $sql="SELECT * FROM register WHERE user='$username' AND password='$psw'";
}else if($sendtype=="usephone"){
    $sql="SELECT * FROM register WHERE phone='$username' AND password='$psw'";
}
$res=$conn->query($sql);
if($res->num_rows){
    echo "yes";
}else{
    echo "no";
}

?>