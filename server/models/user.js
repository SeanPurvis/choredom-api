// server/models/user.js
/**
Each model specifies the database schema for a particular table.
The SEQUELIZE library will take this model definition and generate a timestamped
a timestamped database migration file.
**/


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
  });
  
return User;
};
