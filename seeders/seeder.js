'use strict';

const db = require("../models");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Role', [
      {name: 'Teacher'},
      {name: 'Student'}
    ], {});


    const role1 = await queryInterface.sequelize.query(
      'SELECT id from Role where name = "Teacher";'
    );
    console.log(role1);
    const role2 = await queryInterface.sequelize.query(
      'SELECT id from Role where name = "Student";'
    );
    console.log("role2",role2[1][0].id);

    await db.Users.bulkCreate( [
    {username: 'msmith', password: 'teacher', last_name: 'Smith', first_name: 'Maggie',  RoleId: role1[0][0].id},
    {username: 'eli', password: 'teacher', last_name: 'Li', first_name: 'Elaine',  RoleId: role1[0][0].id},
    {username: 'mtobias', password: 'teacher', last_name: 'Tobias', first_name: 'Margie',  RoleId: role1[0][0].id},
    {username: 'jryan', password: 'student', last_name: 'Ryan', first_name: 'Jane',  RoleId: role2[0][0].id, TeacherId: '1'}, 
    {username: 'tmoreno', password: 'student', last_name: 'Moreno', first_name: 'Tom',  RoleId: role2[0][0].id, TeacherId: '1'},
    {username: 'kcat', password: 'student', last_name: 'Cat', first_name: 'Katherine',  RoleId: role2[0][0].id, TeacherId: '1'},
    {username: 'mmouse', password: 'student', last_name: 'Mouse', first_name: 'Mindy',  RoleId: role2[0][0].id, TeacherId: '2'}, 
    {username: 'pholiday', password: 'student', last_name: 'Holiday', first_name: 'Peter',  RoleId: role2[0][0].id, TeacherId: '2'},
    {username: 'mjones', password: 'student', last_name: 'Jones', first_name: 'Matina',  RoleId: role2[0][0].id, TeacherId: '2'},
    {username: 'tpots', password: 'student', last_name: 'Pots', first_name: 'Tim',  RoleId: role2[0][0].id, TeacherId: '3'}, 
    {username: 'pglass', password: 'student', last_name: 'Glass', first_name: 'Peter',  RoleId: role2[0][0].id, TeacherId: '3'},
    {username: 'mbook', password: 'student', last_name: 'Book', first_name: 'Monica',  RoleId: role2[0][0].id, TeacherId: '3'}
    ],{});
  



await queryInterface.bulkInsert('Character',[
  {name: 'caped_orange', filename: 'ClipartKey_1528455.png',alt_text: 'cartoon image of caped hero from ClipartKey',UserId: '4'},
  {name: 'caped_blue', filename:  'ClipartKey_156046.png',alt_text:'cartoon image of caped hero from ClipartKey',UserId:'5'},
  {name: 'flying_purple', filename:  'ClipartKey_1586159.png',alt_text:'cartoon image of caped hero from ClipartKey',UserId:'6'},
  {name: 'Super_girl', filename:  'super_girl.jpg',alt_text:'cartoon image of caped hero from Etsy',UserId:'7'},
  {name: 'Hulk', filename:  'hulk.png',alt_text:'cartoon image of caped hero from Etsy',UserId:'8'},
  {name:'Super_girl', filename: 'super_girl.jpg',alt_text: 'cartoon image of caped hero from Etsy',UserId: '9'},
  {name: 'flying_purple', filename: 'ClipartKey_1586159.png',alt_text: 'cartoon image of caped hero from ClipartKey'},
  {name: 'Hulk', filename: 'hulk.png', alt_text: 'cartoon image of caped hero from Etsy'},
  {name: 'rainbow', filename: 'PlaceHolderRainbow.png',alt_text: 'cute clipart png from pngtree.com',UserId:'1'},
  {name: 'rainbow', filename: 'PlaceHolderRainbow.png',alt_text: 'cute clipart png from pngtree.com',UserId:'2'},
  {name: 'rainbow', filename: 'PlaceHolderRainbow.png',alt_text: 'cute clipart png from pngtree.com',UserId:'3'},
  {name: 'flying_purple', filename:  'ClipartKey_1586159.png',alt_text:'cartoon image of caped hero from ClipartKey',UserId:'10'},
  {name: 'Super_girl', filename:  'super_girl.jpg',alt_text:'cartoon image of caped hero from Etsy',UserId:'12'},
  {name: 'Hulk', filename:  'hulk.png',alt_text:'cartoon image of caped hero from Etsy',UserId:'11'},
  ],{});
 }
}
