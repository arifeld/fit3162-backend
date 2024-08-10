const express = require('express')
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

    res.json(data);
})