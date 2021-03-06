const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session)
const connectDB = require("./config/db");


//? Load Config
dotenv.config({
  path: "./config/config.env"
});


//? Passport Config
require("./config/passport")(passport);


connectDB();
const app = express();


//? Body Parser(to access the data from form through req.body)
//* this doesnt include the user which is part of the posts schema 
//* we can get the use from req.user (POST add post route)
app.use(express.urlencoded({
  extended: false
}));


// This is for any Json Data
app.use(express.json());


//* morgan will run only in dev mode
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}


// ? Sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })

  })
);

app.use(express.urlencoded({
  extended: false
}));

//*  Handlebars Assistance (helpers)
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
} = require('./assistance/hbs')


//* HandleBars Views Engine
app.engine(".hbs", exphbs({
  helpers: {
    formatDate,
    stripTags,
    truncate,
    editIcon
  },
  defaultLayout: "main",
  extname: ".hbs"
}));
app.set("view engine", ".hbs");


//* Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


//* Set Global Variable so template vies can see User
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
})


//* Static Folder
app.use(express.static(path.join(__dirname, "public")));


//* ROUTES
app.use("/", require("./controllers/index"));
app.use("/auth", require("./controllers/auth"));
app.use('/posts', require('./controllers/posts'));


const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV}mode on port ${PORT}`
  )
);