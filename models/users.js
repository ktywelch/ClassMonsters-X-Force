// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// This js create user model
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parentFName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parentLName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parentPhoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    parentEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    },
    {
      timestamps: false
    });
    Users.associate = (models) => {
      Users.belongsTo(models.Role),
      Users.hasMany(models.Attendence);
      Users.hasOne(models.Character);
      Users.hasOne(Users, {as: 'teacher'});
      Users.hasMany(models.Feeling);
    };
  
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  Users.addHook("beforeCreate", async (user) =>  {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return Users;
};
