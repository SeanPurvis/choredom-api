module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  });
  Group.associate = (models) => {
    Group.hasMany(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Group;
};
