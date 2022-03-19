'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    associate(models) {
      // define association here
      this.hasMany(models.Post, {
        onDelete: 'CASCADE'
      })
      this.hasMany(models.Like, {
        onDelete: 'CASCADE'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    attachment: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return User;
};