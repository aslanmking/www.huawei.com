<?php
    include('./library/conn.php');

    $sql = "select * from product";

    $result = $mysqli->query($sql);

    $mysqli->close();

    $arr = array();

    while($row = $result->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;
?>