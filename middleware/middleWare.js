express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
require("../config/passport")(passport);
const middleware = async () => {
  //! Session needs to be above passport middleware
  router.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      //Mongo Store will go here once that is set
    })
  );

  //* PassPort MiddleWare
  router.use(passport.initialize());
  router.use(passport.session());
};
module.exports = { router, middleware };
