const express = require('express');
const router = express.Router();
const {
  ensureAuth,
  ensureGuest
} = require('../middleware/authMiddleware')

const Post = require('../models/Posts')


//* GET: / home page.
router.get('/', ensureGuest, (req, res, next) => {
  res.render('login', {
    layout: 'loginLayout',
  })
});


router.get('/dashboard', async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.user.id
    }).lean()
    res.render('dashboard', {
      name: req.user.firstName,
      posts
    })
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});





//* GET: /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  console.log(req.user)

})

//* GET: /auth/google

//* GET: /auth/google/callback

module.exports = router