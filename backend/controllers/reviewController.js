// const Movie = require("../models/Movie");

// // Get all reviews for a movie
// exports.getReviews = async (req, res) => {
//   const movie = await Movie.findOne({ id: req.params.movieId });
//   if (!movie) return res.status(404).json({ message: "Movie not found" });
//   res.json(movie.reviews.reverse());
// };

// // Add a review
// exports.addReview = async (req, res) => {
//   const movie = await Movie.findOne({ id: req.params.movieId });
//   if (!movie) return res.status(404).json({ message: "Movie not found" });

//   const review = {
//     _id: Date.now(),
//     userId: req.user.id,
//     author: req.user.email,
//     comment: req.body.comment,
//     rating: req.body.rating,
//     likes: [],
//     dislikes: [],
//     replies: [],
//     createdAt: new Date(),
//   };

//   movie.reviews.push(review);
//   await movie.save();
//   res.status(201).json(review);
// };

// // Edit review
// exports.editReview = async (req, res) => {
//   const movie = await Movie.findOne({ id: req.params.movieId });
//   if (!movie) return res.status(404).json({ message: "Movie not found" });

//   const review = movie.reviews.id(req.params.reviewId);
//   if (!review) return res.status(404).json({ message: "Review not found" });

//   if (review.userId !== req.user.id) {
//     return res.status(403).json({ message: "Unauthorized" });
//   }

//   review.comment = req.body.comment || review.comment;
//   review.rating = req.body.rating || review.rating;

//   await movie.save();
//   res.json(review);
// };

// // Delete review
// exports.deleteReview = async (req, res) => {
//   const movie = await Movie.findOne({ id: req.params.movieId });
//   const review = movie.reviews.id(req.params.reviewId);

//   if (!review) return res.status(404).json({ message: "Not found" });
//   if (review.userId !== req.user.id)
//     return res.status(403).json({ message: "Unauthorized" });

//   review.deleteOne();
//   await movie.save();

//   res.json({ message: "Deleted" });
// };

// // Like review
// exports.likeReview = async (req, res) => {
//   const movie = await Movie.findOne({ id: req.params.movieId });
//   const review = movie.reviews.id(req.params.reviewId);

//   review.dislikes = review.dislikes.filter((u) => u !== req.user.id);
//   if (!review.likes.includes(req.user.id)) review.likes.push(req.user.id);

//   await movie.save();
//   res.json(review);
// };

// // Dislike review
// exports.dislikeReview = async (req, res) => {
//   const movie = await Movie.findOne({ id: req.params.movieId });
//   const review = movie.reviews.id(req.params.reviewId);

//   review.likes = review.likes.filter((u) => u !== req.user.id);
//   if (!review.dislikes.includes(req.user.id)) review.dislikes.push(req.user.id);

//   await movie.save();
//   res.json(review);
// };

// // Add reply
// exports.addReply = async (req, res) => {
//   const movie = await Movie.findOne({ id: req.params.movieId });
//   const review = movie.reviews.id(req.params.reviewId);

//   review.replies.push({
//     _id: Date.now(),
//     userId: req.user.id,
//     author: req.user.email,
//     comment: req.body.comment,
//     createdAt: new Date(),
//   });

//   await movie.save();
//   res.json(review);
// };
// const Movie = require("../models/Movie");

// // GET ALL REVIEWS OF A MOVIE
// exports.getReviews = async (req, res) => {
//   const movie = await Movie.findOne({ id: req.params.movieId });
//   if (!movie) return res.status(404).json({ message: "Movie not found" });

//   res.json(movie.reviews);
// };

// // ADD REVIEW
// exports.addReview = async (req, res) => {
//   const movie = await Movie.findOne({ id: req.params.movieId });
//   if (!movie) return res.status(404).json({ message: "Movie not found" });

//   const review = {
//     userId: req.user.id,
//     author: req.user.email,
//     rating: req.body.rating,
//     comment: req.body.comment,
//     likes: [],
//     dislikes: [],
//     replies: []
//   };

//   movie.reviews.push(review);
//   await movie.save();

//   res.status(201).json(review);
// };

// // EDIT REVIEW
// exports.editReview = async (req, res) => {
//   const movie = await Movie.findOne({ "reviews._id": req.params.reviewId });
//   if (!movie) return res.status(404).json({ message: "Movie not found" });

//   const review = movie.reviews.id(req.params.reviewId);
//   if (!review) return res.status(404).json({ message: "Review not found" });

//   // Only owner can edit
//   if (review.userId.toString() !== req.user.id)
//     return res.status(403).json({ message: "Unauthorized" });

//   review.comment = req.body.comment || review.comment;
//   review.rating = req.body.rating || review.rating;

//   await movie.save();
//   res.json(review);
// };

// // DELETE REVIEW
// exports.deleteReview = async (req, res) => {
//   const movie = await Movie.findOne({ "reviews._id": req.params.reviewId });
//   if (!movie) return res.status(404).json({ message: "Movie not found" });

//   const review = movie.reviews.id(req.params.reviewId);
//   if (!review) return res.status(404).json({ message: "Review not found" });

//   if (review.userId.toString() !== req.user.id)
//     return res.status(403).json({ message: "Unauthorized" });

//   review.deleteOne();
//   await movie.save();

//   res.json({ message: "Review deleted" });
// };

// // LIKE REVIEW
// exports.likeReview = async (req, res) => {
//   const movie = await Movie.findOne({ "reviews._id": req.params.reviewId });
//   const review = movie.reviews.id(req.params.reviewId);

//   review.dislikes = review.dislikes.filter((u) => u !== req.user.id);

//   if (!review.likes.includes(req.user.id)) {
//     review.likes.push(req.user.id);
//   }

//   await movie.save();
//   res.json(review);
// };

// // DISLIKE REVIEW
// exports.dislikeReview = async (req, res) => {
//   const movie = await Movie.findOne({ "reviews._id": req.params.reviewId });
//   const review = movie.reviews.id(req.params.reviewId);

//   review.likes = review.likes.filter((u) => u !== req.user.id);

//   if (!review.dislikes.includes(req.user.id)) {
//     review.dislikes.push(req.user.id);
//   }

//   await movie.save();
//   res.json(review);
// };

// // ADD REPLY
// exports.addReply = async (req, res) => {
//   const movie = await Movie.findOne({ "reviews._id": req.params.reviewId });
//   const review = movie.reviews.id(req.params.reviewId);

//   review.replies.push({
//     userId: req.user.id,
//     author: req.user.email,
//     comment: req.body.comment
//   });

//   await movie.save();
//   res.json(review);
// };
const Review = require("../models/Review");
const User = require("../models/User");

/* ---------------------------------------
   GET ALL REVIEWS OF LOGGED USER
--------------------------------------- */
async function getMyReviews(req, res) {
  try {
    const reviews = await Review.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("getMyReviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/* ---------------------------------------
   GET REVIEWS OF MOVIE
--------------------------------------- */
async function getReviews(req, res) {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId })
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("getReviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/* ---------------------------------------
   ADD REVIEW
--------------------------------------- */
async function addReview(req, res) {
  try {
    const { rating, comment } = req.body;

    if (!comment || !rating)
      return res.status(400).json({ message: "Rating & comment required" });

    const user = await User.findById(req.user.id);

    const review = await Review.create({
      movieId: req.params.movieId,
      userId: req.user.id,
      author: user.email,
      rating,
      comment,
    });

    res.json(review);
  } catch (err) {
    console.error("addReview error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/* ---------------------------------------
   EDIT REVIEW
--------------------------------------- */
async function editReview(req, res) {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    review.comment = req.body.comment ?? review.comment;
    review.rating = req.body.rating ?? review.rating;

    await review.save();

    res.json(review);
  } catch (err) {
    console.error("editReview error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/* ---------------------------------------
   DELETE REVIEW
--------------------------------------- */
async function deleteReview(req, res) {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await review.deleteOne();

    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error("deleteReview error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/* ---------------------------------------
   LIKE REVIEW
--------------------------------------- */
async function likeReview(req, res) {
  try {
    const review = await Review.findById(req.params.reviewId);
    const uid = req.user.id;

    if (!review) return res.status(404).json({ message: "Review not found" });

    review.dislikes = review.dislikes.filter((id) => id.toString() !== uid);

    if (review.likes.includes(uid)) review.likes.pull(uid);
    else review.likes.push(uid);

    await review.save();
    res.json(review);
  } catch (err) {
    console.error("likeReview error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/* ---------------------------------------
   DISLIKE REVIEW
--------------------------------------- */
async function dislikeReview(req, res) {
  try {
    const review = await Review.findById(req.params.reviewId);
    const uid = req.user.id;

    if (!review) return res.status(404).json({ message: "Review not found" });

    review.likes = review.likes.filter((id) => id.toString() !== uid);

    if (review.dislikes.includes(uid)) review.dislikes.pull(uid);
    else review.dislikes.push(uid);

    await review.save();
    res.json(review);
  } catch (err) {
    console.error("dislikeReview error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/* ---------------------------------------
   ADD REPLY
--------------------------------------- */
async function addReply(req, res) {
  try {
    const { comment } = req.body;

    if (!comment)
      return res.status(400).json({ message: "Reply comment required" });

    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    const user = await User.findById(req.user.id);

    review.replies.push({
      userId: user._id,
      author: user.email,
      comment,
      createdAt: new Date(),
    });

    await review.save();
    res.json(review);

  } catch (err) {
    console.error("addReply error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
exports.getMyReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json(reviews);
  } catch (err) {
    console.error("getMyReviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------
   FINAL EXPORT (IMPORTANT)
--------------------------------------- */
module.exports = {
  getMyReviews,
  getReviews,
  addReview,
  editReview,
  deleteReview,
  likeReview,
  dislikeReview,
  addReply
};
