module.exports = (sequelize, DataTypes) => { 
  const User = sequelize.define("users", { 
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attachment: {
      allowNull: false,
      defaultValue: 'https://frc.research.vub.be/sites/default/files/styles/large/public/thumbnails/image/basic-profile-picture_5.jpg', //add a default profile pic
      type: DataTypes.STRING
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  })

  User.associate = (models) => {
    User.hasMany(models.likes, {
      onDelete: "cascade",
    })

    User.hasMany(models.posts, {
      onDelete: "cascade",
    })

  }

  return User
}
