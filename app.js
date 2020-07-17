const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const connectDB = require("./config/db");
const middleware = require("./middleware/middleWare");

middleware();
require("./config/passport")(passport);

//? Load Config
dotenv.config({ path: "./config/config.env" });
//* Passport Config
connectDB();
const app = express();
//* morgan will run only in dev mode
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

//* HandleBars Views Engine
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* ROUTES
app.use("/", require("./controllers/index"));
app.use("/auth", require("./controllers/auth"));

const PORT = process.env.PORT || 3500;
app.listen(PORT, console.log(`Sever Running on Port: ${PORT}`));
