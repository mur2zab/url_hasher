const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config");
const PORT = config.app.PORT;
const { initializeDb, initializeAPIs } = require("./bootstrap.js")
const cors = require("cors")

app.use(bodyParser())
app.use(express.static('./public'))
app.use(cors());

initializeDb().then(() => {
  initializeAPIs(app)
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })
}).catch((err) => {
  console.log("ERROR: In initializations", err)
})

