// Bringing in secrets from .env file
require("dotenv").config();

const express = require("express");
const passport = require('./config/passport');
const session = require("express-session");
const db = require("./models/");
//  const app = express.Router();
const app = express();


const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public/"));

app.use(
  session({ secret:'teachersrule', resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

//APIs for Public
const clientRouter = require('./routes/clientRoutes');
//APIs for internals
const apiRouter = require('./routes/apiRoutes');
//Studnet APIs
const stuRouter = require('./routes/stuRoutes');
<<<<<<< HEAD
=======
//Teacher APIs


 
// Sets up the Express App
const app = express();

const PORT = process.env.PORT || 8080;

const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));
>>>>>>> c27006177a4cda5d2bb8bf3608012fd3aff5c79b

clientRouter(app);
apiRouter(app);
stuRouter(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));
});

