const express = require("express");
const clientRouter = require('./routes/clientRoutes');
const apiRouter = require('./routes/apiRoutes')


// Sets up the Express App
const app = express();

const PORT = process.send.PORT || 8080;

const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

clientRouter(app);
apiRouter(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});