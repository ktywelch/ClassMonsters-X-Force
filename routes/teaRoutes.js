const db = require('../models');


module.exports = (app) => {
    //GET route for the list of teachers
    app.get('/api/teachers', (req, res) => {
        db.Teacher.findAll({}).then((dbTeacher) => {
            res.json(dbTeacher);
        });
    });
    //GET route for a specific teacher
    app.get('/api/teachers/:id', (req, res) => {
        db.Teacher.findOne({
            where: {
            id: req.params.id,
            },
        }).then((dbTeacher) => res.json(dbTeacher))
    });

    //POST route for add new teacher
    app.post('/api/teachers', (req, res) => {
        db.Teacher.create(req.body).then((dbTeacher) => res.json(dbTeacher))
    });

    //DELETE route for deleting teachers
    app.delete('/api/teachers/:id', (req, res) => {
        db.Teacher.destroy({
            where: {
                id: req.params.id,
            },
        }).then((dbTeacher) => res.json(dbTeacher));
    });

    app.put('/api/teachers', (req, res) => {
        db.Teacher.update(req.body, {
            where: {
                id: req.body.id,
            }
        }).then((dbTeacher) => res.json(dbTeacher));
    });
};  