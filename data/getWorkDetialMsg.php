<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type:application/json;charset=UTF-8');
    @$wId=$_REQUEST['wId'] or die('{"code":"2","msg":"wId required"}');
    require('init.php');
    $sql="SELECT project.pName,work.wTitle,employee.eName,work.deadLine FROM project,work,employee WHERE work.wId=$wId AND project.pId=work.pId AND employee.eId=work.responsibledId";

