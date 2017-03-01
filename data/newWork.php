<?php
    header('Content-Type:application/json;charset=UTF-8');
     require("init.php");
    //对象转数组
     function object2array(&$object) {
                  $object =  json_decode( json_encode( $object),true);
                  return  $object;
         }

    $result= file_get_contents("php://input");;
    $result=json_decode($result);
    $result=object2array($result);
    //获取数据
    $wTitle=$result["work"];
    $pName=$result["project"];
    $responsible=$result["responsible"];
    $deadLine=$result["deadLine"];
    $attention=$result["attention"];
    $sponsorId=$result["sponsorId"];

    //用pName查询出pId
    $sql="SELECT pId FROM project WHERE pName='$pName'";
    $pId=mysqli_fetch_row(mysqli_query($conn,$sql))[0];

    //用$responsibleName查询出$responsibleId
    $sql="SELECT eId FROM employee WHERE eName='$responsible'";
    $responsibleId=mysqli_fetch_row(mysqli_query($conn,$sql))[0];
    //获取发起时间
    $sponsorTime=time()*1000;

    //null  $wTitle $pId    $sponsorId  $responsibleId  $sponsorTime    $deadLine   0           null
    $sql="INSERT INTO work VALUES(null,'$wTitle','$pId','$sponsorId','$responsibleId','$sponsorTime','$deadLine','0',null)";
    mysqli_query($conn,$sql);
    $wId=mysqli_insert_id($conn);

    foreach ( $attention as  $attentionId  =>  $value ) {
        $sql="INSERT INTO workattention VALUES(null,'$wId','$attentionId')";
        mysqli_query($conn,$sql);
    }

    echo('{"code":"1","msg":"succ"}');

