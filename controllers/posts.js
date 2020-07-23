const express = require('express');
const router = express.Router();
const {
   ensureAuth
} = require('../middleware/authMiddleware');

const Posts = require('../models/Posts')

//? Desc : Show add page
//? Route : GET /posts/add
router.get('/add', ensureAuth, (req, res) => {
   res.render('posts/add')
})

//? Desc : Process Add Form
//? Route : POST /posts
// POST ROUTE process the add form POST to /posts
router.post('/', ensureAuth, async (req, res) => {
   try {
      req.body.user = req.user.id
      await Posts.create(req.body)
      res.redirect('/dashboard')
   } catch (err) {
      console.error(err);
      res.render('error/500')

   }
})


//? Desc : Show All Posts 
//? Route : GET /posts

router.get('/', ensureAuth, async (req, res) => {
   try {
      const posts = await Posts.find({
            status: 'public'
         })
         .populate('user')
         .sort({
            creatAt: 'desc'
         })
         .lean()

      res.render('posts/index', {
         posts
      })

   } catch (err) {
      console.error(err)
      res.render('error/500')
   }
})


module.exports = router;