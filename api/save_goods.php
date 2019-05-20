<?php
require_once('fn.php');
session_start();

//接收数据
$cid=isset($_POST['cid'])?$_POST['cid']:'merce';
$gid=isset($_POST['gid'])?$_POST['gid']:'1';
$qty=isset($_POST['qty'])?$_POST['qty']:'1';

// 判断商品是否已存在，如果是，加数量
$res=selectRows("select * from order_form where cid='$cid' and gid='$gid'");
// 获得该商品的数量和价格，更新数量和总价信息
if($res>0){
    $res1=selectDB("SELECT quantity, price FROM order_form WHERE cid='$cid' AND gid='$gid'");
    $order_num=$res1[0]['quantity'];
    $price=$res1[0]['price'];
    $new_num=$order_num+$qty;
    $new_total=$new_num*$price;
    $update_it="update order_form set quantity='$new_num',total_price='$new_total' where gid='$gid'";
    $res2=updateDB($update_it);
    if($res2){   
        echo "成功了";
    }else{
        echo "更新数据失败了";
    }

}else{//不存在该商品，就插入

$res3=selectDB("select src,title,size,eat_type,price,in_stock from goodslist where id=$gid");
// var_dump($res3);
$img=$res3[0]['src'];
$title=$res3[0]['title'];
$size=$res3[0]['size'];
$eat_type=$res3[0]['eat_type'];
$price=$res3[0]['price'];
$stock=$res3[0]['in_stock'];
$total_price=$price*$qty;
$sql4="insert into order_form (cid,gid,quantity,img,title,size,eat_type,price,total_price,storage) values('$cid','$gid','$qty','$img','$title','$size','$eat_type','$price','$total_price','$stock')";
$res4=insertDB($sql4);
// 插入数据
}


?>