module.exports = (sequelize, DataTypes) => {
	// Crée la table Posts
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

	// Associe les commentaires et les likes aux posts
	// Quand on supprime un post, ça supprime tout les commentaires et likes liés
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
