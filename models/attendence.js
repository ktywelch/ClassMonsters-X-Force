module.exports = function(sequelize, DataTypes) {
  var Attendence = sequelize.define("attendence", {
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

  return Attendence;
};