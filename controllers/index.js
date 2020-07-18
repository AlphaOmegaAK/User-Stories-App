var express = require("express");
var router = express.Router();

//* GET: / home page.
router.get("/", (req, res, next) => {
  res.render("login", {
    layout: "loginLayout",
  });
});

//* GET: /dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

//* GET: /auth/google

//* GET: /auth/google/callback

module.exports = router;
