module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {    
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  });
  Teacher.associate = function(models) {
    Teacher.hasMany(models.Student, {as: 'students'});
    Teacher.belongsTo(models.User)
  };
  return Teacher;
};
