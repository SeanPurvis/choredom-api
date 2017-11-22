module.exports = (sequelize, DataTypes) => {
  const GroupSetting = sequelize.define('GroupSetting', {
    style: {
      type: DataTypes.ENUM('dictatorship', 'democracy'),
      allowNull: false,
    },
    assigmentFrequency: {
      type: DataTypes.ENUM('monthly', 'weekly', 'daily'),
      allowNull: false,
    },
    assignmentDay: {
      type: DataTypes.ENUM('monday', 'tuesday', 'wednesday', 'thursday','friday','saturday','sunday'),
      allowNull: false,
    },
    stealFactor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    assignmentFactor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  });
  GroupSetting.associate = (models) => {
    GroupSetting.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE'
    });
  };
  return GroupSetting;
}
