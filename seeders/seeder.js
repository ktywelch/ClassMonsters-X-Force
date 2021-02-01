'use strict';

const db = require("../models");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('roles', [
      {name: 'Teacher'},
      {name: 'Student'}
    ], {});

    const role1 = await queryInterface.sequelize.query(
      'SELECT id from Roles where name = "Teacher";'
    );
    console.log(role1);
    const role2 = await queryInterface.sequelize.query(
      'SELECT id from Roles where name = "Student";'
    );
    console.log("role2",role2[1][0].id);

    await db.Users.bulkCreate( [
    {username: 'msmith', password: 'teacher', last_name: 'Smith', first_name: 'Maggie',  RoleId: role1[0][0].id},
    {username: 'eli', password: 'teacher', last_name: 'Li', first_name: 'Elaine',  RoleId: role1[0][0].id},
    {username: 'mtobias', password: 'teacher', last_name: 'Tobias', first_name: 'Margie',  RoleId: role1[0][0].id},
    {username: 'jryan', password: 'student', last_name: 'Ryan', first_name: 'Jane',  RoleId: role2[0][0].id}, 
    {username: 'tmoreno', password: 'student', last_name: 'Moreno', first_name: 'Tom',  RoleId: role2[0][0].id},
    {username: 'kcat', password: 'student', last_name: 'Cat', first_name: 'Katherine',  RoleId: role2[0][0].id},
    {username: 'hcruz', password: 'student', last_name: 'Cruz', first_name: 'Hector',  RoleId: role2[0][0].id}, 
   
    ],{});
  }
};




