'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        associate(models) {
            // define association here
            this.hasMany(models.Like, {
                onDelete: 'CASCADE'
            })

            this.hasMany(models.Post, {
                onDelete: 'CASCADE'
            })

            this.belongsTo(models.User, {
                foreignKey: 'user_id',
                onDelete: 'CASCADE'
            })
                
            this.belongsTo(this, {
                foreignKey: 'post_id',
                onDelete: 'CASCADE'
            })
        }
        
    }
    Post.init(
        {
            user_id: DataTypes.INTEGER,
            post_id: DataTypes.INTEGER,
            post_type: DataTypes.STRING,
            content: DataTypes.TEXT,
            attachment: DataTypes.STRING,
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
            modelName: 'post',
            tableName: 'post'
        });
    return Post;
};