const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

/**
 * GET endpoint to retrieve all comments
 * @route GET /api/comments
 * @returns {Array} Array of all comments
 */
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE endpoint to delete a comment by ID
 * @route DELETE /api/comments/:id
 * @param {string} id - The comment ID to delete
 * @returns {Object} Success message or error response
 * @throws {404} Comment not found
 * @throws {401} Unauthorized - User must be comment author
 */
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    
    await comment.remove();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
