'use strict';

const db = require("../models");

module.exports = {
  up: async (queryInterface) => {

    await db.Users.bulkCreate( [
    {username: 'msmith', password: 'teacher', last_name: 'Smith', first_name: 'Maggie',  RoleId: '1'},
    {username: 'eli', password: 'teacher', last_name: 'Li', first_name: 'Elaine',  RoleId: '1'},
    {username: 'mtobias', password: 'teacher', last_name: 'Tobias', first_name: 'Margie',  RoleId: '1'},
    {username: 'jryan', password: 'student', last_name: 'Ryan', first_name: 'Jane',  RoleId: '2', TeacherId: '1'}, 
    {username: 'tmoreno', password: 'student', last_name: 'Moreno', first_name: 'Tom',  RoleId: '2', TeacherId: '1'},
    {username: 'kcat', password: 'student', last_name: 'Cat', first_name: 'Katherine',  RoleId: '2', TeacherId: '1'},
    {username: 'mmouse', password: 'student', last_name: 'Mouse', first_name: 'Mindy',  RoleId: '2', TeacherId: '2'}, 
    {username: 'pholiday', password: 'student', last_name: 'Holiday', first_name: 'Peter',  RoleId: '2', TeacherId: '2'},
    {username: 'mjones', password: 'student', last_name: 'Jones', first_name: 'Matina',  RoleId: '2', TeacherId: '2'},
    {username: 'tpots', password: 'student', last_name: 'Pots', first_name: 'Tim',  RoleId: '2', TeacherId: '3'}, 
    {username: 'pglass', password: 'student', last_name: 'Glass', first_name: 'Peter',  RoleId: '2', TeacherId: '3'},
    {username: 'mbook', password: 'student', last_name: 'Book', first_name: 'Monica',  RoleId: '2', TeacherId: '3'}
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
