<?php

    include('./library/conn.php');


    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    $select = "select * from users where username='$username' and password='$password'";

    $result = $mysqli->query($select);

    $mysqli->close();

    if($result->num_rows>0){
        // 设置  谁登陆了
        $row = $result->fetch_assoc(); // 从查询结果中获得数据

        // php 设置cookie信息
        // setcookie(name,value,expires,path)

        // 每次HTTP请求时都会自动携带cookie进行发送

        // php获得当前时间 time()
        
        setcookie('username',$row['username'],time()+3600*24,'/');
        setcookie('isLogined','true',time()+3600*24,'/');
        echo '{"has":false}';
    }else{
        echo '{"has":true}';
    }
?>