const mongoose = require("mongoose");
const config = require("../config")

const connection = mongoose.connect(config.db.MONGODB_URI, {
  autoIndex: true,
  reconnectTries: 3,
  reconnectInterval: 500,
  useNewUrlParser: true,
});

mongoose.set("useCreateIndex", true);

connection
  .then((db) => db)
  .catch((err) => {
    console.log(err);
  });

module.exports = connection;
