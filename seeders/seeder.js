'use strict';

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

    await queryInterface.bulkInsert('Users', [
    {username: 'msmith', password: 'teach', last_name: 'Smith', first_name: 'Maggie',  RoleId: role1[0].id},
    {username: 'mtobias', password: 'teach', last_name: 'Tobias', first_name: 'Margie',  RoleId: role1[0].id},
    {username: 'jryan', password: 'student', last_name: 'Ryan', first_name: 'Jane',  RoleId: role2[0].id}, 
    {username: 'tmoreno', password: 'student', last_name: 'Moreno', first_name: 'Tom',  RoleId: role2[0].id},
    {username: 'hcruz', password: 'student', last_name: 'Cruz', first_name: 'Hector',  RoleId: role2[0].id}, 
    {username: 'eli', password: 'student', last_name: 'Li', first_name: 'Elaine',  RoleId: role2[0].id},
    ],{});

    const fromid = await queryInterface.sequelize.query(
      `SELECT UserId from users where username = "msmith";`
    );
    const toid = await queryInterface.sequelize.query(
      `SELECT UserId from users where  username = "eli";`
    );
    console.log(toid);
    return await queryInterface.bulkInsert('messages', [
      {message: "Test messages",read: '0', fromId: fromid[0].id, toId: toid[0].id },
      {message: "Test messages 2",read: '0', fromId: fromid[0].UserId, toId: toid[0].UserId},
      {message: "Test messages 3",read: '0', fromId: fromid[0].UserId, toId: toid[0].UserId},
      {message: "Test messages 4",read: '0', fromId: fromid[0].UserId, toId: toid[0].UserId},
      {message: "Test messages 5",read: '0', fromId: toid[0].UserId, toId: fromid[0].UserId},
      {message: "Test messages 6",read: '0', fromId: toid[0].UserId, toId: fromid[0].UserId},
      {message: "Test messages 6",read: '0', fromId: toid[0].UserId, toId: fromid[0].UserId }
    ],{});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Messages', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};




