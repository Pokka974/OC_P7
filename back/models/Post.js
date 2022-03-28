module.exports = (sequelize, DataTypes) => {
	
	const Post = sequelize.define('posts', {
		post_type: {
			allowNull: false,
			type: DataTypes.STRING(20)
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		attachment: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	})

	Post.associate = (models) => {
		Post.hasMany(models.posts, {
			onDelete: 'cascade',
		})

		Post.hasMany(models.likes, {
			onDelete: 'cascade',
		})
	}
	
	return Post
}
