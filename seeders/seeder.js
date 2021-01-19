'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Role', [
      {name: 'Teacher'},
      {name: 'Student'}
    ], {});

    const role1 = await queryInterface.sequelize.query(
      'SELECT id from roles where name = "Teacher";'
    );
    console.log(role1);
    await queryInterface.bulkInsert('User', [
    {username: teach1, password: teachPw1, RoleId: role1[0].id},
    {username: teach2, password: teachPw2, RoleId: role1[0].id},
    ],{});

    const courseRows = courses[0];

    return await queryInterface.bulkInsert('videos', [
      {title: 'Movie 1', description: '...', id: '1', course_id: courseRows[0].id}
      {title: 'Movie 2', description: '...', id: '2', course_id: courseRows[0].id},
      {title: 'Movie 3', description: '...', id: '3', course_id: courseRows[0].id},
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('videos', null, {});
    await queryInterface.bulkDelete('courses', null, {});
  }
};




