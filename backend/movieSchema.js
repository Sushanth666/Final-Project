
// // module.exports=mongoose.model("Movie_data", movieSchema);
// const mongoose = require("mongoose");

// // --- 1. Add this new schema ---
// const reviewSchema = new mongoose.Schema(
//   {
//     author: { type: String, default: "Anonymous" }, // You can link this to a User ID later
//     comment: { type: String, required: true },
//     rating: { type: Number, min: 1, max: 10, required: true }
//   },
//   { timestamps: true } // Adds createdAt/updatedAt to each review
// );
// // --- End of new schema ---

// const movieSchema = new mongoose.Schema(
//   {
//     // ... all your other fields (id, title, director, etc.)
    
//     // --- 2. Add this new field to your main schema ---
//     reviews: [reviewSchema] // An array of review documents
    
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Movie_data", movieSchema);