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

INSERT INTO `classHeros_db`.`Messages`(`message`,`read`,`fromId`,`toId`) 
VALUES 
("Message1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '1','3'), 
("Message3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '2','5'), 
("Message4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '6','2'),
("Message2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", '0', '2','6');