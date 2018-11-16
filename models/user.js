module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
      firstName: DataTypes.TEXT,
      lastName:  DataTypes.TEXT,
      phoneNumber: DataTypes.INTEGER,
      role: DataTypes.TEXT
    },
    {
      timestamps: false
    });
    return User;
  };
  