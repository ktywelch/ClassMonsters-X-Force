// Dependencies
const path = require('path');

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/login.html'))
  );

  app.get('/signup', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/signup.html'))
  );

  app.get('/student', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/student.html'))
  );

  app.get('/teacher', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/teacher.html'))
  );


  app.get('/test', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/test.html'))
);
}