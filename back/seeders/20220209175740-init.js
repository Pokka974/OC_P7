'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', 
      [
        {
          id: 100,
          username: 'Admin',
          email: 'admin@admin.com',
          password: '$2y$10$49TFM04okLK4pMdlldZ9x.PEL6XBGxZ00XLqPJnmaqDurzK8ij4/C',
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
