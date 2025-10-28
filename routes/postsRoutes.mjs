import express from "express";
import Post from "../models/postSchema.mjs"; 
import Comment from "../models/commentSchema.mjs";
import adminAuth from "../middleware/adminAuth.mjs";

const router = express.Router(); 

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("comments").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
router.post("/", async (req, res) => {
  try {
    const { author, content } = req.body;
    const newPost = new Post({ author, content });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a comment to a post
router.post("/:postId/comments", async (req, res) => {
  try {
    const { author, text } = req.body;
    const newComment = new Comment({ author, text });
    await newComment.save();

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push(newComment);
    await post.save();

    res.json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
