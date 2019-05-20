<?php
//设置编码
header('content-type:text/html;charset=utf-8');
include 'connect.php';
//接收数据
$mobile=isset($_POST['mobile'])?($_POST['mobile']):'';
// 连接数据库
/*
    ***聚合数据（JUHE.CN）短信API服务接口PHP请求示例源码
    ***DATE:2015-05-25
*/
// 制作随机数
function GetRandStr($length){
    $str='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $len=strlen($str)-1;
    $randstr='';
    for($i=0;$i<$length;$i++){
    $num=mt_rand(0,$len);
    $randstr .= $str[$num];
    }
    return $randstr;
    }
    $number=GetRandStr(6);
    // 制作6位随机数
 
$url = "http://v.juhe.cn/sms/send";
$params = array(
    'key'   => '0d0f7dedfb0012e675da145a1d9b6976', //您申请的APPKEY
    'mobile'    =>$mobile, //接受短信的用户手机号码
    'tpl_id'    => '157788', //您申请的短信模板ID，根据实际情况修改
    'tpl_value' =>'#code#='.$number.'&#company#=聚合数据' //您设置的模板变量，根据实际情况修改
);

$paramstring = http_build_query($params);
$content = juheCurl($url, $paramstring);
$result = json_decode($content, true);
if ($result) {
    $datalist=array(
        'phonecode'=>$number,
        'message'=>$result
    );
    echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
} else {
    //请求异常
}

/**
 * 请求接口返回内容
 * @param  string $url [请求的URL地址]
 * @param  string $params [请求的参数]
 * @param  int $ipost [是否采用POST形式]
 * @return  string
 */
function juheCurl($url, $params = false, $ispost = 0)
{
    $httpInfo = array();
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'JuheData');
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    if ($ispost) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_URL, $url);
    } else {
        if ($params) {
            curl_setopt($ch, CURLOPT_URL, $url.'?'.$params);
        } else {
            curl_setopt($ch, CURLOPT_URL, $url);
        }
    }
    $response = curl_exec($ch);
    if ($response === FALSE) {
        //echo "cURL Error: " . curl_error($ch);
        return false;
    }
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $httpInfo = array_merge($httpInfo, curl_getinfo($ch));
    curl_close($ch);
    return $response;
} 
?>

