module.exports = function(sequelize, DataTypes) {
var Messages = sequelize.define("Messages", {
  subject: {
    type: DataTypes.STRING(55),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
  }
}, {
  timestamps: false
});
Messages.associate = function(models) {
  Messages.belongsTo(models.Users,{as: "FromId"});
  Messages.belongsTo(models.Users,{as: "ToId"})
};
return Messages;
}