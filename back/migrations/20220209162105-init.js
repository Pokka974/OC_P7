'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      attachment: {
        allowNull: false,
        defaultValue:'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg', //add a default profile pic
        type: Sequelize.STRING
      },
      is_admin: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      post_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'post',
          key: 'id'
        }
      },
      post_type: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      attachment: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'user',
          key: 'id'
        }
      },
      onUpdate: "cascade",
      onDelete: "cascade",
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'post',
          key: 'id'
        }
      },
      onUpdate: "cascade",
      onDelete: "cascade",
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};