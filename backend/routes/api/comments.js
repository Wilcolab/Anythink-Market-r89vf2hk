/**
 * DELETE endpoint to delete a comment by ID
 * @route DELETE /api/comments/:id
 * @param {string} id - The comment ID to delete
 * @returns {Object} Success message or error response
 * @throws {404} Comment not found
 * @throws {401} Unauthorized - User must be comment author
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

// Hey GitHub Copilot, 

router.get(

// DELETE endpoint to delete a comment by ID

module.exports = router;
