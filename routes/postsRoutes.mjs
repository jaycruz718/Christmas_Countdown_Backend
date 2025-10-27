import express from 'express';
import Post from "../models/postSchema.mjs";
import adminAuth from '../middleware/adminAuth.mjs';

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("comments").sort({ createdAt: -1 });
  res.json(posts);
});

// Create a new post
router.post("/", async (req, res) => {
  const { author, content } = req.body;
  const newPost = new Post({ author, content });
  await newPost.save();
  res.json(newPost);
});

// Add a comment to a post
router.post("/:postId/comments", async (req, res) => {
  const { author, text } = req.body;
  const newComment = new Comment({ author, text });
  await newComment.save();

  const post = await Post.findById(req.params.postId);
  post.comments.push(newComment);
  await post.save();

  res.json(newComment);
});

export default router;