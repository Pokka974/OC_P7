'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Like extends Model {

        associate(models) {

            models.User.belongsToMany(models.Post, {
                through: this,
                foreignKey: 'user_id',
                otherKey: 'post_id'
            })

            models.Post.belongsToMany(models.User, {
                through: this,
                foreignKey: 'post_id',
                otherKey: 'user_id'
            })
            
            // define association here
            this.userId = this.belongsTo(models.User, {
                foreignKey: 'user_id'
            });
            this.postId = this.belongsTo(models.Post, {
                foreignKey: 'post_id'
            });
        }
    }

    Like.init(
        {
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
            modelName: 'like',
            tableName: 'like'
        });
    return Like;
};