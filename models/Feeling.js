module.exports = function(sequelize, DataTypes) {
  var Feeling = sequelize.define("Feeling", {
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
  Feeling.associate = (models) => {
    Feeling.hasMany(models.Feeling_icon);
  }
  return Feeling;
};