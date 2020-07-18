const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");

//? Load Config
dotenv.config({ path: "./config/config.env" });
//? Passport Config
require("./config/passport")(passport);

connectDB();
const app = express();

// ? Sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    //! Mongo Store key goes here
  })
);

//* morgan will run only in dev mode
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

//* HandleBars Views Engine
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use(express.urlencoded({ extended: false }));

//* Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* ROUTES
app.use("/", require("./controllers/index"));
app.use("/auth", require("./controllers/auth"));

const PORT = process.env.PORT || 4000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV}mode on port ${PORT}`
  )
);
