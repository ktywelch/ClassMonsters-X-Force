module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
  Role.associate = function(models) {
    Role.hasMany(models.User, {as: 'users'})
  };
  return Role;
};
