<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type:application/json;charset=UTF-8');
    @$eId=$_REQUEST['eId'] or die('{"code":"2","msg":"eId required"}');
    require('init.php');

//    查询未完成 isComplete=0
    $sql1="SELECT work.deadLine,work.wTitle,work.isComplete,work.completeTime,work.wId,project.pName FROM project,work WHERE work.sponsorId=$eId AND work.isComplete=0 AND project.pId=work.pId";
//    查询已完成 isComplete=1
    $sql2="SELECT work.deadLine,work.wTitle,work.isComplete,work.completeTime,work.wId,project.pName FROM project,work WHERE work.sponsorId=$eId AND work.isComplete=1 AND project.pId=work.pId";
//    接受数据容器
    $list=[];
//    今天的数据
    $result=mysqli_query($conn,$sql1);
    $list[]=mysqli_fetch_all($result,MYSQLI_ASSOC);

//    以后的数据
    $result=mysqli_query($conn,$sql2);
    $list[]=mysqli_fetch_all($result,MYSQLI_ASSOC);

//    var_dump($list);
    echo json_encode($list);
