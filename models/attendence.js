module.exports = function(sequelize, DataTypes) {
  var Attendence = sequelize.define("Attendence", {
    // The email cannot be null, and must be a proper email before creation
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    studentId: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false
  });

  // Attendence.associate = (models) => {
  //   Attendence.belongsTo(models.Student, {foreignKey: 'studentId'});
  // };

  return Attendence;
};