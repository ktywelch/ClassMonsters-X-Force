SELECT `Messages`.`message`,`Messages`.`read`, `Messages`.`fromId`,`Messages`.`toId`, 
concat(Frm.last_name," ", Frm.first_name) as FromFullname 
FROM `classHeros_db`.`Messages`
left join Users as Frm on  `Messages`.`fromId` = `Frm`.`id`  where `Messages`.`toId` = "2" ;
