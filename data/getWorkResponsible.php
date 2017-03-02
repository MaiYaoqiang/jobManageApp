<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type:application/json;charset=UTF-8');
    @$eId=$_REQUEST['eId'] or die('{"code":"2","msg":"eId required"}');
    require('init.php');
//    获取今天0点时间和24点时间
    $timeToday=strtotime(date("Y-m-d",time()))*1000;
    $timeTodayEnd=$timeToday+3600*24*1000;
//    查询今天的数据
    $sql1="SELECT work.deadLine,work.wTitle,work.wId,project.pName FROM project,work WHERE work.responsibleId=$eId AND project.pId=work.pId AND work.deadLine>=$timeToday AND work.deadLine<=$timeTodayEnd ORDER BY work.deadLine DESC";
//    查询以后的数据
    $sql2="SELECT work.deadLine,work.wTitle,work.wId,project.pName FROM project,work WHERE work.responsibleId=$eId AND project.pId=work.pId AND work.deadLine>$timeTodayEnd ORDER BY work.deadLine DESC";
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
