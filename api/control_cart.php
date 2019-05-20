<?php
require_once('fn.php');
session_start();
$cid=isset($_POST['cid'])?($_POST['cid']):'';
$gid=isset($_POST['gid'])?($_POST['gid']):'';
$quantity=isset($_POST['quantity'])?($_POST['quantity']):'';
$storage=isset($_POST['storage'])?($_POST['storage']):'';
$type=isset($_POST['type'])?($_POST['type']):'';
if($type=="add"||$type=="sub"){//购物车增加和减少
    $res1=selectDB("SELECT price FROM order_form WHERE cid='$cid' AND gid='$gid'");
    $price=$res1[0]['price'];
    $new_total=$quantity*$price;
    $update_it="update order_form set quantity='$quantity',total_price='$new_total',storage='$storage' where gid='$gid' and cid='$cid'";
    $res2=updateDB($update_it);
    echo $new_total;
}else if($type=="del"){//删除购物车
    $del="DELETE FROM order_form WHERE gid='$gid' and cid='$cid'";
    updateDB($del);
}


?>