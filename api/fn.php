<?php

// 负责数据库连接
function connectDB()
{

    $conn = mysqli_connect('localhost', 'root', '');
    if (!$conn) {
       echo "连接失败";
        return null;
    }
    mysqli_select_db($conn,'yaofangwang');
    // mysqli_set_charset($conn,'utf8');
    return $conn;
}

$db = connectDB();
// 负责数据库的查询并返回数组结果
function selectDB($sql)
{
    global $db;
    $dataset = mysqli_query($db, $sql);
    $dataSource = [];
    while ($row = mysqli_fetch_assoc($dataset)) {
        $dataSource[] = $row;
    }
    return $dataSource;
}

// 负责查询数据的数量
function selectRows($sql)
{
    global $db;
    $dataset = mysqli_query($db, $sql);
    $row = mysqli_num_rows($dataset);
    return $row;
}

// 负责执行insert语句,返回insert记录的id
function insertDB($sql)
{
    global $db;
    $rst = mysqli_query($db, $sql);
    $res = mysqli_insert_id($db);
    return $res;

}

//负责执行update,delete语句
function updateDB($sql)
{
    global $db;
    $rst = mysqli_query($db, $sql);

    if ($rst) {
        return true;
    } else {
        return false;
    }
}