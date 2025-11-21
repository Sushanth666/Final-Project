// const Movie = require("../models/Movie");

// exports.getMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.json(movies);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getMovieById = async (req, res) => {
//   try {
//     const movie = await Movie.findOne({ id: req.params.id });
//     if (!movie) return res.status(404).json({ message: "Movie not found" });

//     res.json(movie);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.addReview = async (req, res) => {
//   try {
//     const movie = await Movie.findOne({ id: req.params.id });
//     if (!movie) return res.status(404).json({ message: "Movie not found" });

//     movie.reviews.push(req.body);

//     await movie.save();

//     res.status(201).json(movie.reviews[movie.reviews.length - 1]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.bulkInsert = async (req, res) => {
//   try {
//     const movies = req.body;

//     if (!Array.isArray(movies))
//       return res.status(400).json({ message: "Array required" });

//     const inserted = await Movie.insertMany(movies, { ordered: false });

//     res.json({ insertedCount: inserted.length });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// const Movie = require("../models/Movie");

// // GET ALL MOVIES
// exports.getMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.json(movies);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // GET MOVIE BY ID
// exports.getMovieById = async (req, res) => {
//   try {
//     const movie = await Movie.findOne({ id: req.params.id });
//     if (!movie) return res.status(404).json({ message: "Movie not found" });

//     res.json(movie);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ADD REVIEW
// exports.addReview = async (req, res) => {
//   try {
//     const movie = await Movie.findOne({ id: req.params.id });
//     if (!movie) return res.status(404).json({ message: "Movie not found" });

//     const review = {
//       userId: req.user.id,
//       author: req.user.email,
//       rating: req.body.rating,
//       comment: req.body.comment,
//       likes: [],
//       dislikes: [],
//       replies: []
//     };

//     movie.reviews.push(review);
//     await movie.save();

//     res.status(201).json(movie.reviews[movie.reviews.length - 1]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // EDIT REVIEW
// exports.editReview = async (req, res) => {
//   try {
//     const movie = await Movie.findOne({ id: req.params.movieId });
//     if (!movie) return res.status(404).json({ message: "Movie not found" });

//     const review = movie.reviews.id(req.params.reviewId);
//     if (!review) return res.status(404).json({ message: "Review not found" });

//     if (review.userId !== req.user.id)
//       return res.status(403).json({ message: "Unauthorized" });

//     review.rating = req.body.rating || review.rating;
//     review.comment = req.body.comment || review.comment;

//     await movie.save();
//     res.json(review);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // DELETE REVIEW
// exports.deleteReview = async (req, res) => {
//   try {
//     const movie = await Movie.findOne({ id: req.params.movieId });
//     if (!movie) return res.status(404).json({ message: "Movie not found" });

//     const review = movie.reviews.id(req.params.reviewId);
//     if (!review) return res.status(404).json({ message: "Review not found" });

//     if (review.userId !== req.user.id)
//       return res.status(403).json({ message: "Unauthorized" });

//     review.deleteOne();
//     await movie.save();

//     res.json({ message: "Review deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // LIKE REVIEW
// exports.likeReview = async (req, res) => {
//   try {
//     const movie = await Movie.findOne({ id: req.params.movieId });
//     const review = movie.reviews.id(req.params.reviewId);

//     review.dislikes = review.dislikes.filter(u => u !== req.user.id);
//     if (!review.likes.includes(req.user.id)) review.likes.push(req.user.id);

//     await movie.save();
//     res.json(review);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // DISLIKE REVIEW
// exports.dislikeReview = async (req, res) => {
//   try {
//     const movie = await Movie.findOne({ id: req.params.movieId });
//     const review = movie.reviews.id(req.params.reviewId);

//     review.likes = review.likes.filter(u => u !== req.user.id);
//     if (!review.dislikes.includes(req.user.id))
//       review.dislikes.push(req.user.id);

//     await movie.save();
//     res.json(review);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ADD REPLY
// exports.addReply = async (req, res) => {
//   try {
//     const movie = await Movie.findOne({ id: req.params.movieId });
//     const review = movie.reviews.id(req.params.reviewId);

//     review.replies.push({
//       userId: req.user.id,
//       author: req.user.email,
//       comment: req.body.comment
//     });

//     await movie.save();
//     res.json(review);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const Movie = require("../models/Movie");
const Review = require("../models/Review");
const mongoose = require("mongoose");

/* ============================================================
   GET ALL MOVIES
   (Works for any ID schema: ObjectId, numeric, string)
============================================================ */
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().lean();
    res.json(movies);
  } catch (err) {
    console.error("getMovies error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   GET MOVIE BY ID (Safe for numeric ID or ObjectId)
============================================================ */
exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    let movie = null;

    const isObjId = mongoose.Types.ObjectId.isValid(id);

    // 1. If valid ObjectId → try by _id
    if (isObjId) {
      movie = await Movie.findById(id).lean();
    }

    // 2. If not found OR not valid ObjectId → try custom ID fields
    if (!movie) {
      movie = await Movie.findOne({
        $or: [
          { id: id },        // your custom numeric/string ID
          { movieId: id },   // fallback if some docs use movieId
        ]
      }).lean();
    }

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // fetch reviews
    const reviews = await Review.find({ movieId: movie._id.toString() }).lean();

    res.json({ ...movie, reviews });

  } catch (err) {
    console.error("getMovieById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   ADD REVIEW
============================================================ */
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment required" });
    }

    const movieId = req.params.id;

    const review = await Review.create({
      movieId,           // store backend ID safely
      userId: req.user.id,
      author: req.user.email,
      rating,
      comment,
    });

    res.json(review);
  } catch (err) {
    console.error("addReview error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   EDIT REVIEW
============================================================ */
exports.editReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    review.comment = comment ?? review.comment;
    review.rating = rating ?? review.rating;

    await review.save();

    res.json(review);
  } catch (err) {
    console.error("editReview error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   DELETE REVIEW
============================================================ */
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted" });

  } catch (err) {
    console.error("deleteReview error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   LIKE REVIEW
============================================================ */
exports.likeReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    // remove from dislikes
    review.dislikes = review.dislikes.filter((id) => id.toString() !== userId);

    // toggle like
    if (review.likes.includes(userId)) {
      review.likes.pull(userId);
    } else {
      review.likes.push(userId);
    }

    await review.save();
    res.json(review);
  } catch (err) {
    console.error("likeReview error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   DISLIKE REVIEW
============================================================ */
exports.dislikeReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    // remove from likes
    review.likes = review.likes.filter((id) => id.toString() !== userId);

    // toggle dislike
    if (review.dislikes.includes(userId)) {
      review.dislikes.pull(userId);
    } else {
      review.dislikes.push(userId);
    }

    await review.save();
    res.json(review);
  } catch (err) {
    console.error("dislikeReview error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   ADD REPLY
============================================================ */
exports.addReply = async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "Reply comment required" });
    }

    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    review.replies.push({
      userId: req.user.id,
      author: req.user.email,
      comment,
      createdAt: new Date(),
    });

    await review.save();

    res.json(review);
  } catch (err) {
    console.error("addReply error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
