<?php
    $conn=mysqli_connect(SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_DB,SAE_MYSQL_PORT);
    //$conn=mysqli_connect('127.0.0.1','root','','app',3306);
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);