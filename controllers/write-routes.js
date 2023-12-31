const router = require('express').Router();
const withAuth = require('../utils/auth.js')
const { Post, User } = require('../models')


// WRITE Task
router.get('/', withAuth, async (req, res) => res.render('write-post', {userId: req.session.user_id, loggedIn: req.session.loggedIn}))


// UPDATE Task
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id)

    if (!postData) {
      const err = new Error('No post exists with that id.')
      res.status(404).json({message: 'No post exists with that id.'})
      console.log(err)
      return
    }

    const post = postData.get({plain: true})

   
    if (post.user_id !== req.session.user_id) {
      const err = new Error('Please log in to the account that wrote this post.')
      res.status(500).json({message: 'Please log in to the account that wrote this post to edit it.'})
      console.log(err)
      res.render('login')
    }

    res.render('write-post', {post: post, userId: req.session.user_id, postId: req.params.id, loggedIn: req.session.loggedIn})
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router;