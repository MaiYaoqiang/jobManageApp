<?php


//echo strtotime(date('Y-m-d',strtotime('+1 day'))),'';
//echo strtotime('2017-1-22');

$timetoday=strtotime(date("Y-m-d",time()));
$time2=$timetoday+3600*24;
echo $timetoday;

echo $time2;
//select* from  ...order by id ;