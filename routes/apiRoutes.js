// Requiring our models
const db = require('../models');
var emoji = require('node-emoji');
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
        }, include: [db.Role], include: [db.Character],  include: [db.Feeling]
      }).then((dbGetMess) => { 
      res.json(dbGetMess)})
    .catch(err => {
  console.error(err);
  })
})

//Login Route
app.post('/api/login', function(req, res) {
  var username = req.body.userID;
  var password = req.body.password;
  console.log(username,password);
  if (username && password) {
// check if user exists
    db.Users.findOne({
      where: {
        username: username,
        password: password
        },include: [db.Role]
      })
      .then((data) => { 
        if(data){
          if(data.Role.name === 'Teacher'){
            res.redirect(`/teacher?uid=${data.id}`)
          } else if (data.Role.name === 'Student'){
            res.redirect(`/student?uid=${data.id}`)
          } else {
            res.json(data)
          }
        } else {
          return res.json([{"msg": "The userID or Password was invalid"}])
        }
        })
      .catch((err) => {throw err})
    }
});
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

  app.get('/api/icons/:id', (req, res) => {
    emoji.get(req.params.id)
    console.log(abc)
    return(abc)
  });

  //Feelings route;
  app.post('/api/feelings/:id', (req, res) => {
    console.log(req.body)
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

  //Logout api
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
}


