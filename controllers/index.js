const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/authMiddleware')


//* GET: / home page.
router.get('/',ensureGuest, (req, res, next) => {
  res.render('login', {
    layout: 'loginLayout',
  })
})

//* GET: /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard')
})

//* GET: /auth/google

//* GET: /auth/google/callback

module.exports = router
