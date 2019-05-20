<?php
//接收数据
include "connect.php";//连接数据库
$page=isset($_GET["page"])?($_GET["page"]):"1";
$num=isset($_GET["num"])?($_GET["num"]):"20";
$type = isset($_GET['type']) ? $_GET['type'] : '';//这个变量用于判断是否排序，根据什么规则排序
$order = isset($_GET['order']) ? $_GET['order'] : '';//判断是升序还是降序
$numstart=($page-1)*$num;
// echo $type;
//是否排序的判断
if($type) {
    //不为空：意味已经有值传过来，需要排序
    $sql = "SELECT * FROM goodslist ORDER BY $type $order LIMIT $numstart,$num";
}else {
    //空：没有传值过来，不需要排序
    $sql="SELECT * from  goodslist LIMIT $order $numstart,$num";
}

// 执行语句
$res=$conn->query($sql);
$data=$res->fetch_all(MYSQLI_ASSOC);


//根据数据库的总记录求出分页
$sql2="SELECT * from  goodslist";
$res2=$conn->query($sql2);
$total_recording=$res2->num_rows;

//总共有多少条记录？
$datalist =array(//对象
'data'=>$data,//渲染的商品
'total_recording'=>$total_recording,
'page'=>$page,
'num'=>$num
);
echo json_encode($datalist,JSON_UNESCAPED_UNICODE);


$res->close();
$conn->close();

?>