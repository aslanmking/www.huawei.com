<?php
    header('content-type:text/html;charset=utf-8');

    $mysql_conf = array(
        'host'=>'localhost:3306', // 设置主机名和端口号
        'db_user'=>'root', // 用于登陆数据库的用户名
        'db_pass'=>'a123456', // 用于登陆数据库的密码
        'db'=>'huawei' // 数据库名称
    );

    // 登陆(连接)数据库 
    $mysqli = @new mysqli($mysql_conf['host'],$mysql_conf['db_user'],$mysql_conf['db_pass']);

    // var_dump($mysqli);

    if($mysqli->connect_errno){ // 判断连接是否有错误
        // die 用于结束代码执行
        die('连接错误'.$mysqli->connect_errno);
    }

    // 设置查询字符集
    $mysqli->query('set names utf8');

    // 选择数据库
    $select_db = $mysqli->select_db($mysql_conf['db']);

    // 判断是否成功选择数据库
    if(!$select_db){
        die('数据库选择错误'.$mysqli->error);
    }
?>