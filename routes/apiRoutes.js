// Requiring our models
const passport = require("../config/passport");
const db = require('../models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Routes
module.exports = (app) => {

  app.get("/api", (req, res) => {
    res.send({ msg: "success" });
  });

//Login Route
app.post('/api/login',  passport.authenticate("local"), function(req, res) {
  var username = req.body.userID;
  var password = req.body.password;
  console.log(req.user);  
  res.json({ username: req.user.username, id: req.user.id, roleid: req.user.id, rolename: req.user.Role.name});
});

  //Logout api
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", (req, res) => {
      //  res.json({
      //     username: req.user.username,
      //     id: req.user.id,
      //     roleid: req.user.RoleId,
      //     rolename: req.user.Role.name
      //   });     

            if(req.user.Role.name=== 'Teacher'){
              console.log("going to redirect here");
              res.redirect(`/teacher?uid=${req.user.id}`)
            } else if ( req.user.Role.name === 'Student'){
              res.redirect(`/student?uid=${req.user.id}`)
            } else {
              res.json({
                    username: req.user.username,
                    id: req.user.id,
                    roleid: req.user.RoleId,
                    rolename: req.user.Role.name
                  })
                }
  });

// Messages APIs
app.get('/api/messages/:id', (req, res) => {
  let query = 'SELECT `Messages`.`id`, `message`, `subject`, `read`, `fromId`, `toId`, concat(Frm.last_name," ", Frm.first_name) as FromFullname FROM Messages ';
  query += `left join Users as Frm on  Messages.fromId = Frm.id  where ToId = "${req.params.id}"`;
  //console.log("myQuery",query)
  sequelize.query(query,{
    model: db.Messages,
    mapToModel: true
  }).then((dbGetMess) => res.json(dbGetMess))
    .catch(err => console.error(err))
  })

//Create messages
app.post('/api/messages', (req, res) => {
  db.Messages.create({
    subject: req.body.subject,
    message: req.body.message,
    read: req.body.read,
    fromId: req.body.fromId,
    toId: req.body.toId,
  }).then((dbGetMess) => res.json(dbGetMess))
});

//Delete Messages
app.delete('/api/messages/:id', (req, res) => {
  db.Messages.destroy({
    where: {
      id: req.params.id
    }, 
  }).then((dbMess) => res.json(dbMess))
})

//Update Messages
app.put('/api/messages/:id', (req, res, next) => { 
  db.Messages.update(
    {read: req.body.read},
    {where: {id: req.params.id}}
    ).then((results) => {
      res.json(results);
      console.log(results);
      if (results.changedRows === 0) {
        return res.status(404).end()
      }
        res.status(200).end();
    })
  .catch(next)
})

//Search "1" User
app.get('/api/users/:id', function(req, res) {
  db.Users.findOne({
      where: {
        id: req.params.id,
        }, include: {all: true}, 
      }).then((dbGetMess) => {
      res.json(dbGetMess)})
    .catch(err => {
  console.error(err);
  })
})

//Get all information for all users
app.get('/api/allnames', function(req, res) {
  db.Users.findAll({
      include: {all: true}
      }).then((dbGetAll) => {
      res.json(dbGetAll)})
    .catch(err => {
  console.error(err);
  })
})

  //Get all students for teacher
  app.get('/api/students/:id', (req, res) => {
    db.Users.findAll({
      where: {
        TeacherId: req.params.id,
        RoleId: "2"
      }, include: [db.Character]
    }).then((dbStudents) => res.json(dbStudents))
    .catch((err) => res.json(err))
  });


  //Feelings route;
  app.post('/api/feelings/:id', (req, res) => {
    db.Feeling.create({
      feeling: req.body.feeling,
      UserId: req.params.id,
    }).then((dbFeelings) => res.json(dbFeelings))
    .catch((err) => res.json(err))
  });

  app.get('/api/feelings/:id', (req, res) => {
    let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

    db.Feeling.findAll({
      where: {
        createdAt: { [Op.between]: ["2021-01-20 00:00:00", now] },
        UserId: req.params.id,
      },
    }).then((dbFeelings) => res.json(dbFeelings))
    .catch((err) => res.json(err))
  });





}


