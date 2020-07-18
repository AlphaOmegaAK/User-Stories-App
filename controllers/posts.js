const express = require('express');
const router = express.Router();
const {
   ensureAuth
} = require('../middleware/authMiddleware');

const Posts = require('../models/Posts')

router.get('/add', ensureAuth, (req, res) => {
   res.render('posts/add')
})


module.exports = router;