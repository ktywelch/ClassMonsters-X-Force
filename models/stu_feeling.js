module.exports = function(sequelize, DataTypes) {
  var Stu_feeling = sequelize.define("Stu_feeling", {
    // The email cannot be null, and must be a proper email before creation
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    feeling_id: {
      type: DataTypes.INTEGER,
      },
    student_id:  {
        type: DataTypes.INTEGER,
      }
  },
  {
    timestamps: false
  });
  Stu_feeling.associate = (models) => {
  Stu_feeling.belongsTo(models.Student);
  Stu_feeling.belongsTo(models.Feeling_icon);
  }
  return Stu_feeling;
};