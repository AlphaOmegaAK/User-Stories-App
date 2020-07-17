const express = require("express");
const dotenv = require("dotenv");
const moregan = require("morgan");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
//? Load Config
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

//? morgan will run only in dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//? HandleBars Views Engine
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

const PORT = process.env.PORT || 3500;
app.listen(PORT, console.log(`Sever Running on Port: ${PORT}`));
