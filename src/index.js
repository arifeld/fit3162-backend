const express = require('express')
const logger = require("./logging/logging.js");
const connectDatabase = require("./db/connection.js");
require('dotenv').config();

// Import express routers.
const business = require("./routing/business.js");
const users = require('./routing/user.js');

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

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    logger.info(`App listening on port ${port}`)
  })

  // Store the database reference in express, so it can be accessed using
  // req.app.get("db")
  app.set("db", database);

  app.post('/test', (req, res) => {
    res.send('Hello world');
  } )

  app.use("/business", business);
  app.use('/users', users);

  

}

function checkEnv() {
  const EXPECTED_ENV_VARIABLES = [process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_PASS, process.env.MYSQL_DB];
  for (let i in EXPECTED_ENV_VARIABLES) { if (EXPECTED_ENV_VARIABLES[i] == undefined) throw new Error(`Environment variables are not configured correctly. Check the .env.template file.`); }
}


setup();
