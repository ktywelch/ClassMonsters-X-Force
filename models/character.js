module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    // The email cannot be null, and must be a proper email before creation

    character_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
      },
    alt_text: {
      type: DataTypes.STRING
      },
    },
    character_pic_filename: {
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
