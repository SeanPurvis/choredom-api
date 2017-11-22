module.exports = (sequelize, DataTypes) => {
  const Chore = sequelize.define('Chore', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    worth: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    stolen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  Chore.associate = (models) => {
    Chore.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Chore;
}
