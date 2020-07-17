var express = require("express");
var router = express.Router();

//* GET: / home page.
router.get("/", (req, res, next) => {
  res.send("login");
});

//* GET: /dashboard
router.get("/dashboard", (req, res) => {
  res.send("Dashboard");
});

module.exports = router;
