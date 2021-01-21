
module.exports = function(sequelize, DataTypes) {
  var Call_on = sequelize.define("Call_on", {
    // The email cannot be null, and must be a proper email before creation
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
  
  Call_on.associate =  (models) => {
    Call_on.hasMany(models.Users);
  }
  return Call_on;
};