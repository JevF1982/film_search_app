const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

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
  .connect(process.env.MONGODB_URI || process.env.MONGO_DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error:  + ${err.message}`);
  });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("Frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

// listen on port

app.listen(PORT, () => console.log("server up and running"));
