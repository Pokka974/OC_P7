'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    let password = await bcrypt.hash('Password1234', 10)
    console.log(password);
    await queryInterface.bulkInsert('user', 
      [
        {
          id: 100,
          username: 'Admin',
          email: 'admin@admin.com',
          password: password,
          is_admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        // {
        //   id: 2,
        //   username: 'user2',
        //   email: 'user2@test.com',
        //   password: 'password2',
        //   created_at: new Date(),
        //   updated_at: new Date(),
        // },
        // {
        //   id: 3,
        //   username: 'user3',
        //   email: 'user3@test.com',
        //   password: 'password3',
        //   created_at: new Date(),
        //   updated_at: new Date(),
        // },
      ],
      {}
    );

    // await queryInterface.bulkInsert(
    //   'post',
    //   [
    //     {
    //       id: 1,
    //       user_id: 1,
    //       post_type: "post",
    //       content: "first post",
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       id: 2,
    //       user_id: 2,
    //       post_type: "post",
    //       content: "second post",
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //   ],
    //   {}
    // );

    // await queryInterface.bulkInsert(
    //   'like',
    //   [
    //     {
    //       id: 1,
    //       user_id: 1,
    //       post_id: 1,
    //       post_type: "post",
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       id: 2,
    //       user_id: 1,
    //       post_id: 2,
    //       post_type: "post",
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //   ],
    //   {}
    // );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('like', null);
    await queryInterface.bulkDelete('post', null);
    await queryInterface.bulkDelete('user', null);
  }
};
