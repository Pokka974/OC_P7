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
      defaultValue:'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg', //add a default profile pic
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
