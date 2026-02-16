/**
 * Express router for managing comments
 * @type {express.Router}
 */

/**
 * Get all comments for a specific post
 * @route GET /:postId
 * @param {string} req.params.postId - The ID of the post
 * @returns {object[]} Array of comment objects sorted by creation date (newest first)
 * @throws {Error} Returns 500 status on server error
 */

/**
 * Create a new comment
 * @route POST /
 * @param {object} req.body - Request body
 * @param {string} req.body.postId - The ID of the post being commented on
 * @param {string} req.body.author - The author of the comment
 * @param {string} req.body.content - The content of the comment
 * @returns {object} The newly created comment object with 201 status
 * @throws {Error} Returns 500 status on server error
 */

/**
 * Delete a specific comment by ID
 * @route DELETE /:commentId
 * @param {string} req.params.commentId - The ID of the comment to delete
 * @returns {object} Success message with deleted comment
 * @throws {Error} Returns 404 if comment not found, 500 on server error
 */

/**
 * Delete all comments for a specific post
 * @route DELETE /post/:postId
 * @param {string} req.params.postId - The ID of the post whose comments should be deleted
 * @returns {object} Success message with count of deleted comments
 * @throws {Error} Returns 404 if no comments found, 500 on server error
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
module.exports = router;
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}); 
router.post("/", async (req, res) => {
  try {
    const { postId, author, content } = req.body;
    const newComment = new Comment({ postId, author, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});    
//add another endpoint for deleting a comment
router.delete("/post/:postId", async (req, res) => {
  try {
    const result = await Comment.deleteMany({ postId: req.params.postId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No comments found for this post" });
    }
    res.json({ message: "Comments deleted for the post" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});