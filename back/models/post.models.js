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
                foreignKey: 'likes'
            })
            this.userId = this.belongsTo(models.User, {
                foreignKey: 'user_id',
            })
                
            this.hasMany(this)
            this.postId = this.belongsTo(this, {
                foreignKey: 'post_id'
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
            likes: DataTypes.INTEGER,
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