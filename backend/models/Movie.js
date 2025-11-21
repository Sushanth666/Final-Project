const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    userId: String,
    author: String,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    userId: String,
    author: String,
    rating: { type: Number, min: 1, max: 10, required: true },
    comment: { type: String, required: true },

    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },

    replies: { type: [replySchema], default: [] }
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    genre: [String],
    rating: Number,
    image: String,
    description: String,
    year: Number,

    reviews: [reviewSchema]
  },
  { timestamps: true, collection: "Movie_data" }
);

module.exports = mongoose.model("Movie", movieSchema);
