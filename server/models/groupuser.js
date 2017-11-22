module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  });
    GroupUser.associate = (models) => {
      GroupUser.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      GroupUser.belongsTo(models.Group, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
  });
  };
  return GroupUser;
}
