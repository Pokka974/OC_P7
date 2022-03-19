'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {

        associate(models) {

            // models.User.belongsToMany(models.Post, {
            //     through: this,
            //     foreignKey: 'user_id',
            //     otherKey: 'post_id'
            // })

            // models.Post.belongsToMany(models.User, {
            //     through: this,
            //     foreignKey: 'post_id',
            //     otherKey: 'user_id'
            // })
            
            // // define association here
            this.belongsTo(models.User, {
                foreignKey: 'user_id',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Post, {
                onDelete: 'CASCADE',
                foreignKey: 'post_id',
                constraints: false
            });
        }
    }

    Likes.init(
        {
            user_id: DataTypes.INTEGER,
            post_id: DataTypes.INTEGER,
            post_type: DataTypes.STRING,
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
        }, 
        {
            sequelize,
            modelName: 'likes',
            tableName: 'likes'
        });
    return Likes;
};