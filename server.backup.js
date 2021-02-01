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

clientRouter(app);
apiRouter(app);
stuRouter(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));
});

