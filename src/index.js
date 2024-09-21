const express = require('express')
const logger = require("./logging/logging.js");
const { connectDatabase, bootstrapData } = require("./db/connection.js");
require('dotenv').config();
const cors = require('cors');

// Import express routers.
const category = require("./routing/category.js");
const business = require('./routing/business.js');
const store = require("./routing/store.js");
const owner = require("./routing/owner.js");
const user = require("./routing/user.js");
const review = require("./routing/review.js");

/*
  Main entry point to the backend. Checks that the appropriate environment variables are set, and that a connection to the database can be established.
  If it appears the database has not yet been configured, it runs the bootstrap code automatically.
*/

function setup() {
  logger.info("Initialising backend.");

  checkEnv();

  const database = connectDatabase();

  const app = express()
  const port = 4000

  app.use(express.json()); 
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    logger.info(`App listening on port ${port}`)
  })

  // Store the database reference in express, so it can be accessed using
  // req.app.get("db")
  app.set("db", database);
  app.use("/category", category);
  app.use("/business", business);
  app.use("/store", store);
  app.use("/owner", owner);
  app.use("/user", user);
  app.use("/review", review);

}

function checkEnv() {
  const EXPECTED_ENV_VARIABLES = [process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_PASS, process.env.MYSQL_DB];
  for (let i in EXPECTED_ENV_VARIABLES) { if (EXPECTED_ENV_VARIABLES[i] == undefined) throw new Error(`Environment variables are not configured correctly. Check the .env.template file.`); }
}


setup();
