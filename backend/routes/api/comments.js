var router = require("express").Router();
var mongoose = require("mongoose");
var Comment = mongoose.model("Comment");
var User = mongoose.model("User");
var auth = require("../auth");

// Preload comment objects on routes with ':comment'
router.param("comment", function(req, res, next, id) {
  Comment.findById(id)
    .populate("seller")
    .then(function(comment) {
      if (!comment) {
        return res.sendStatus(404);
      }

      req.comment = comment;

      return next();
    })
    .catch(next);
});

/**
 * DELETE endpoint to delete a comment by ID
 * @route DELETE /api/comments/:comment
 * @param {string} comment - The comment ID to delete
 * @returns {204} No content on success
 * @throws {404} Comment not found
 * @throws {401} Unauthorized
 * @throws {403} Forbidden - User must be comment author
 */
router.delete("/:comment", auth.required, function(req, res, next) {
  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      if (req.comment.seller._id.toString() !== req.payload.id.toString()) {
        return res.sendStatus(403);
      }

      return Comment.findByIdAndRemove(req.comment._id)
        .then(function() {
          return res.sendStatus(204);
        });
    })
    .catch(next);
});

module.exports = router;
