const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');

// Create Post
router.post('/', protect, async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user._id });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Comment
router.post('/:id/comments', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.user._id, text: req.body.text });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
