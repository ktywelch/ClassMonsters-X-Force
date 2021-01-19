// Requiring our models
const db = require('../models');
var emoji = require('node-emoji')


// Routes
module.exports = (app) => {
//Message Routes
app.get('/api/messages/:id', (req, res) => {
  console.log(req.params.id)
  db.Messages.findAll({
    where: {
      toId: req.params.id
    }
  }).then((dbGetMess) => res.json(dbGetMess));
})




  app.get('/api/students', (req, res) => {
    const query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    db.Student.findAll({
      where: query,
      include: [db.Author],
    }).then((dbPost) => res.json(dbPost));
  });


  app.get('/api/icons/:id', (req, res) => {
    emoji.get(req.params.id)
   console.log(abc)
   return(abc)
  });





 
  // Get route for retrieving a single post
  app.get('/api/posts/:id', (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Author],
    }).then((dbPost) => res.json(dbPost));
  });

  // POST route for saving a new post
  app.post('/api/posts', (req, res) => {
    db.Post.create(req.body).then((dbPost) => res.json(dbPost));
  });
}