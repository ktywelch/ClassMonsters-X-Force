// Requiring our models
const db = require('../models');

// Routes
module.exports = (app) => {
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

  //update nicknames
  app.put('/api/students/:id', (req, res) => {
    console.log("from api: ", req.body)
    db.Users.update(
      {last_name: req.body.last_name},
      {where: {id: req.params.id}}
      ).then((results) => {
        res.json(results);
        if (results.changedRows === 0) {
          return res.status(404).end()
        }
          res.status(200).end();
      })
      .catch(err => {
        console.error(err);
      })
  })

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