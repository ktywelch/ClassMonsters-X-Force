module.exports = function(sequelize, DataTypes) {
  var Feeling_icon = sequelize.define("feeling_icon", {
    // The email cannot be null, and must be a proper email before creation
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 20],
      },
    },
    // The password cannot be null
    icon_filename: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  });

  return Feeling_icon;
};
