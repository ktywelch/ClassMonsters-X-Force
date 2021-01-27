const express = require("express");

//APIs for Public
const clientRouter = require('./routes/clientRoutes');
//APIs for internals
const apiRouter = require('./routes/apiRoutes');
//Studnet APIs
const stuRouter = require('./routes/stuRoutes');
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

clientRouter(app);
apiRouter(app);
stuRouter(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));
});