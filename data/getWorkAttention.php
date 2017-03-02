<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type:application/json;charset=UTF-8');
    @$eId=$_REQUEST['eId'] or die('{"code":"2","msg":"eId required"}');
    require('init.php');

//    查询未完成 isComplete=0
    $sql="SELECT work.deadLine,work.wTitle,work.wId,project.pName FROM project,work,workAttention WHERE workAttention.attentionId=$eId AND project.pId=work.pId AND workAttention.wId=work.wId ORDER BY work.deadLine DESC";

    $result=mysqli_query($conn,$sql);
    $list=mysqli_fetch_all($result,MYSQLI_ASSOC);

//    var_dump($list);
    echo json_encode($list);
