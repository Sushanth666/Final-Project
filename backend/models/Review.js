const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const ReviewSchema = new mongoose.Schema(
  {
    movieId: { type: String, required: true },   // matches your movie.id field
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    author: { type: String, required: true },    // we store user name or email
    rating: { type: Number, required: true },
    comment: { type: String, required: true },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    replies: [ReplySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
