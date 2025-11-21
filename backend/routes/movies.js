const express = require("express");
const { getMovies, getMovieById } = require("../controllers/movieController");
const {
  getReviews,
  addReview,
  editReview,
  deleteReview,
  likeReview,
  dislikeReview,
  addReply
} = require("../controllers/reviewController");

const auth = require("../middleware/auth");

const router = express.Router();

// MOVIES
router.get("/", getMovies);
router.get("/:id", getMovieById);

// REVIEWS
router.get("/:movieId/reviews", getReviews);
router.post("/:movieId/reviews", auth, addReview);
router.put("/:movieId/reviews/:reviewId", auth, editReview);
router.delete("/:movieId/reviews/:reviewId", auth, deleteReview);
router.post("/:movieId/reviews/:reviewId/like", auth, likeReview);
router.post("/:movieId/reviews/:reviewId/dislike", auth, dislikeReview);
router.post("/:movieId/reviews/:reviewId/reply", auth, addReply);

module.exports = router;
