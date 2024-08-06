const express = require('express')
const mysql = require('mysql2')
const logger = require("./src/logging/logging.js");

require('dotenv').config()

/*
  Main entry point to the backend. Checks that the appropriate environment variables are set, and that a connection to the database can be established.
  If it appears the database has not yet been configured, it runs the bootstrap code automatically.
*/

logger.info("Initialising backend.")

const EXPECTED_ENV_VARIABLES = [process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_PASS]
for (let i in EXPECTED_ENV_VARIABLES) { if (EXPECTED_ENV_VARIABLES[i] == undefined) throw new Error(`Environment variables are not configured correctly. Check the .env.template file.`); }


const database = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: 'reviewdb'
});

database.connect();

const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

app.get("/dummydata", (req, res) => {
    data = {
        "store_id": 1,
        "store_name": "Guzman y Gomez",
        "store_address": "21 Chancellors Walk, Clayton VIC 3800",
        "contact_info": "0399881409",
        "business_id": 1,
        "store_categories": [
            "Mexican",
            "Fast Food",
        ]
    }

    res.json(data)
})