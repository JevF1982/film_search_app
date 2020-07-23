const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// use bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes middleware

const usersRoute = require("./routes/Users");
const favoriteRoute = require("./routes/Favorites");

app.use("/api/users", usersRoute);
app.use("/api/favorites", favoriteRoute);

// connect to db
mongoose
  .connect(process.env.MONGO_DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error:  + ${err.message}`);
  });
// listen on port

app.listen(5000, () => console.log("server up and running"));
