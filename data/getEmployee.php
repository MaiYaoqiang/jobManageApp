<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type:application/json;charset=UTF-8');
    require('init.php');

    $sql="SELECT eId,eName FROM employee";


    $result=mysqli_query($conn,$sql);
    $list=mysqli_fetch_all($result,MYSQLI_ASSOC);

//    var_dump($list);
    echo json_encode($list);
