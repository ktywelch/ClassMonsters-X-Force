module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {    
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false
  });


  Student.associate = (models) => {
    Student.hasMany(models.Attendence, {as: 'attendences', foreignKey: 'studentId'});
    Student.belongsTo(models.User);
   
    Student.belongsTo(models.Teacher);
    Student.hasMany(models.Stu_feeling, {as: 'feelings'});

  };
  


  return Student;
};
