// Requiring our models
const db = require('../models');

// Routes
module.exports = (app) => {

  //update student
  app.put('/api/students/:id', (req, res) => {
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