module.exports = function(sequelize, DataTypes) {
  var Feeling = sequelize.define("Feeling", {
    // The email cannot be null, and must be a proper email before creation
    feeling: {
      type: DataTypes.STRING,
      },
  },
  {
    timestamps: true
  });
  Feeling.associate = (models) => {
    Feeling.hasMany(models.Users);
  }
  return Feeling;
};