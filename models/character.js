module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    // The email cannot be null, and must be a proper email before creation

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
      },
    alt_text: {
      type: DataTypes.STRING
      },
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
  Character.associate = (models) => {
    Character.belongsTo(models.Users);
  }
  return Character;
};
