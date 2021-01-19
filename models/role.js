module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
  Role.associate = function(models) {
    Role.hasMany(models.users, {as: 'users'})
  };
  return Role;
};
