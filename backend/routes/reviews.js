const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addReview,
  editReview,
  deleteReview,
  likeReview,
  dislikeReview,
  addReply,
  getReviews,
  getMyReviews
} = require("../controllers/reviewController");
router.get("/me", auth, getMyReviews);
router.get("/:movieId", getReviews);
router.post("/:movieId", auth, addReview);
router.put("/:reviewId", auth, editReview);
router.delete("/:reviewId", auth, deleteReview);
router.post("/:reviewId/like", auth, likeReview);
router.post("/:reviewId/dislike", auth, dislikeReview);
router.post("/:reviewId/reply", auth, addReply);

module.exports = router;
