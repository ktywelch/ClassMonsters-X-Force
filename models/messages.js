module.exports = function(sequelize, DataTypes) {
var Messages = sequelize.define("messages", {
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
}, {
  timestamps: false
});
Messages.associate = function(models) {
  Messages.hasMany(models.users,{foreignKey: "fromId"});
  Messages.hasMany(models.users,{foreignKey: "toId"})
};
return Messages;
}