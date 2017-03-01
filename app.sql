SET NAMES UTF8;
DROP DATABASE IF EXISTS app;
CREATE DATABASE app CHARSET=UTF8;
USE app;
CREATE TABLE project(
    pId INT PRIMARY KEY AUTO_INCREMENT,
--    项目名
    pName VARCHAR(32)
);
INSERT INTO project VALUES
(null,'轻应用'),
(null,'VIVO'),
(null,'景兴二期'),
(null,'惠而浦移动售后');

CREATE TABLE work(
    wId INT PRIMARY KEY AUTO_INCREMENT,
    wTitle VARCHAR(64),
    pId INT,
--    发起人id
    sponsorId INT,
--    负责人id
    responsibleId INT,
--    发起时间
    sponsorTime BIGINT,
--    截止日期
    deadLine BIGINT,
--    是否完成
    isComplete BOOLEAN,
--    完成时间
    completeTime BIGINT
);
INSERT INTO work VALUES
(null,'需求列表整理','1','1','1','1433123456122','1463123456122',1,'1453123456122'),
(null,'模型确认','1','2','2','1443123456122','1463123456122',1,'1462123456122'),
(null,'需求确认','2','3','3','1453123456122','1493123456122',1,'1483123456122'),
(null,'需求策划','3','1','1','1493123456122','1503123456122',0,null),
(null,'原型输出','4','1','1','1483123456122','1503123456122',0,null);

CREATE TABLE employee(
    eId INT PRIMARY KEY AUTO_INCREMENT,
--    员工登录名
    eLoginName VARCHAR(32),
--    登录密码
    ePwd VARCHAR(16),
--    登录名称
    eName VARCHAR(32),
--    登录图片
    ePhoto VARCHAR(128)
);
INSERT INTO employee VALUES
(null,'maiyaoqiang','123456','麦耀强','img/1.jpg'),
(null,'chenlaoshi','123456','陈老师','img/2.jpg'),
(null,'lilaoshi','123456','李老师','img/3.jpg');

CREATE TABLE workAttention(
    waId INT PRIMARY KEY AUTO_INCREMENT,
--    任务id
    wId INT,
--    关注人id
    attentionId INT
);
INSERT INTO workAttention VALUES
(null,'1','1'),
(null,'1','2'),
(null,'2','1'),
(null,'2','2'),
(null,'2','3'),
(null,'3','1'),
(null,'3','2'),
(null,'4','3');



