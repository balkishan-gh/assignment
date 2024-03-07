const path = require("path");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const clientRoute = require("./routes/client");

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(clientRoute);

mongoose
  .connect("mongodb://localhost:27017/projectDB")
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
