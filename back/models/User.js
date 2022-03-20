module.exports = (sequelize, DataTypes) => { // Exporte le modèle
  const User = sequelize.define("users", { // Crée la table User, avec les colonnes username, password, et isAdmin
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
  });

  // Un user peut avoir plusieurs likes, posts ou commentaire
  User.associate = (models) => {
    User.hasMany(models.likes, {
      onDelete: "cascade",
    });

    User.hasMany(models.posts, {
      onDelete: "cascade",
    });

  };

  return User;
};
