// Dependencies
const path = require('path');
const isAuthenticated = require('../config/middleware/isAuthenticated');
// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get('/', (req, res) => {
     //f the user session is valid pass to post athententication process
     if (req.user) {
        res.redirect("/postauthen");
     }
    res.sendFile(path.join(__dirname, '../public/login.html'))
    });

  app.get('/login', (req, res) =>{
  //f the user session is valid pass to post athententication process
    if (req.user) {
     res.redirect("/postauthen");
    }
    res.sendFile(path.join(__dirname, '../public/login.html'))
  });

  app.get('/signup', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/signup.html'))
  });

  app.get('/student',  (req, res) => {
     if(req.user) {
      res.sendFile(path.join(__dirname, `../public/student.html?uid=${req.user.id}`))
     }
     else {    
      res.sendFile(path.join(__dirname, '../public/login.html'))
    }
    });


    app.get('/teacher', (req, res) =>
    {
      if(req.user) {
     res.sendFile(path.join(__dirname, `../public/teacher.html`))
    }
    else {    
     res.sendFile(path.join(__dirname, '../public/login.html'))
   }
   });

  //Intermediate model to process the authorization aftern authentication
  app.get('/postauthen', isAuthenticated, (req, res) =>
  res.sendFile(path.join(__dirname, '../public/postauthen.html'))
);
}