// Requiring our models
const db = require('../models');

// Routes
module.exports = (app) => {

  //// Victor are we calling this anywhere I think it was old .....
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
      req.body,
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
}