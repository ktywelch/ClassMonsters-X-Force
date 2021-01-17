module.exports = function(sequelize, DataTypes) {
var Messages = sequelize.define("Messages", {
  // The email cannot be null, and must be a proper email before creation
  message: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  read: {
    type: DataTypes.BOOLEAN,
  },
  fromId:  {
      type: DataTypes.INTEGER,  
      },
  toId:  {
    type: DataTypes.INTEGER   
    }
});
Messages.associate = function(models) {
  Messages.belongsTo(models.User,{foreignKey: "fromId"});
  Messages.belongsTo(models.User,{foreignKey: "toId"})
};
return Messages;
}