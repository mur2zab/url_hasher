const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let obj = {
  abc: "www.google.com"
}

app.use(bodyParser())
app.use(express.static('./public'))

app.listen(8000)