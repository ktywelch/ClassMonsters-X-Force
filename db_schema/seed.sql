INSERT INTO `classHeros_db`.`Roles` (`name`) VALUES ('Teacher');
INSERT INTO `classHeros_db`.`Roles` (`name`) VALUES ('Student');
INSERT INTO `classHeros_db`.`Roles` (`name`) VALUES ('Parent');

INSERT INTO `classHeros_db`.`users` (`username`,`password`,`last_name`,`first_name`,RoleId)
VALUES
('eli','teacher','Li','Elaine','1'), 
('rsmith','teacher','Smith','Robert','1'),
('rysmith','student','Smith','Ryan','2'),
('mcruz','student','Cruz','Monica','2'),
('jdoe','student','Doe','Jean','2'),
('kcat','student','Cat','Kitty','2');

INSERT INTO `classHeros_db`.`Messages`('subject',`message`,`read`,`fromId`,`toId`) 
VALUES 
("Message1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '1','3'), 
("Message3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '2','5'), 
("Message4", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '6','2'),
("Message2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '2','6'),
("Message5", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '1','2'),
("Message6", " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '5','2'),
("Message7", " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '1','5'),
("Message8", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '5','1');


INSERT INTO `classHeros_db`.`feelings` (`date`,`feeling_id`,`UserId`) VALUES 
(CURDATE(),'1','3'),
(CURDATE(),'5','4'),
(CURDATE(),'9','5'),
(DATE_SUB(CURDATE(), INTERVAL 1 DAY),'4','3'),
(DATE_SUB(CURDATE(), INTERVAL 1 DAY),'7','4'),
(DATE_SUB(CURDATE(), INTERVAL 1 DAY),'2','5');

INSERT INTO `classHeros_db`.`feeling_icons` (`emotion`,`description`,`icon_hex`) VALUES 
('happy','BIG SMILW FACE','&#x1F600'),
('happy','GRINNING FACE','&#x1F601'),
('happy','CRY LAUGHING FACE','&#x1F602'),
('happy','OPEN EYES SMILING FACE','&#x1F603'),
('sad','SAD FACE1','&#x1F612'),
('sad','SAD FACE2','&#x1F613'),
('sad','SAD FACE3','&#x1F614'),
('silly','SILLY FACE1','&#x1F61B'),
('silly','SILLY FACE2','&#x1F61C'),
('silly','SILLY FACE3','&#x1F61D'),
('angry','ANGRY FACE1','&#x1F620'),
('angry','ANGRY FACE2','&#x1F621'),
('sad','SAD FACE4','&#x1F622'),
('tired','TIRED FACE1','&#x1F634'),
('tired','TIRED FACE2','&#x1F635'),
('confused','CONFUSED FACE1','&#x1f928'),
('confused','CONFUSED FACE2','&#x1F615'),
('confused','CONFUSED FACE3','&#x1f914');










