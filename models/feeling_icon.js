module.exports = function(sequelize, DataTypes) {
  var Feeling_icon = sequelize.define("Feeling_icon", {
    // The email cannot be null, and must be a proper email before creation
    emotion: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 20],
      },
    },
    // The password cannot be null
    icon_hex: {
      type: DataTypes.STRING(8),
      allowNull: false
    }
  },
  {
    timestamps: false
  });

  return Feeling_icon;
};
