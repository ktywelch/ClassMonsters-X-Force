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
  },
  fromId:  {
      type: DataTypes.INTEGER,  
      },
  toId:  {
    type: DataTypes.INTEGER   
    }
}, {
  timestamps: false
});
Messages.associate = function(models) {
  Messages.hasMany(models.Users,{foreignKey: "fromId"});
  Messages.hasMany(models.Users,{foreignKey: "toId"})
};
return Messages;
}