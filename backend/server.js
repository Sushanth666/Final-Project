
// --- Server Start ---
// --- Server Start ---
// const PORT = process.env.PORT || 5000;
// // --- 7. ADD A REVIEW TO A MOVIE ---
// app.post("/api/db-movies/:id/reviews", async (req, res) => {
//   try {
//     const movieId = req.params.id;
    
//     // 1. Get the review data from the request body
//     const { author, comment, rating } = req.body;

//     // 2. Find the movie by its ID
//     const movie = await Movie.findById(movieId);

//     if (!movie) {
//       return res.status(404).json({ message: "Movie not found" });
//     }

//     // 3. Create the new review object
//     const newReview = {
//       author, // You'll get this from req.body (or a logged-in user later)
//       comment,
//       rating
//     };

//     // 4. Add the new review to the movie's 'reviews' array
//     movie.reviews.push(newReview);
    
//     // 5. Save the entire movie document
//     await movie.save();

//     // 6. Send back the newly created review
//     res.status(201).json(movie.reviews[movie.reviews.length - 1]); // Send the last review added

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to add review", error: error.message });
//   }
// });

// // Create a function to start the server
// async function startServer() {
//   try {
//     // 1. Connect to MongoDB
//     await client.connect();

//     // 2. THIS IS MESSAGE
//     console.log('MongoDB connected'); 

//     // 3. Start the Express server *after* the DB is connected
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//   } catch (err) {
//     console.error('Failed to connect to MongoDB', err);
//     process.exit(1); // Exit the app if the DB connection fails
//   }
// }

// // Call the function to start everything
// startServer();
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const connectDB = require("./config/db");

// const authRoutes = require("./routes/authRoutes");

// const movieRoutes = require("./routes/movies");
// const reviewRoutes = require("./routes/reviews");
// const authMiddleware = require("../middleware/authMiddleware");


// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

// // mount routes ONCE
// // const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);
// app.use("/api/movies", movieRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/reviews", require("./routes/reviews"));

// app.get("/", (req, res) => res.send("Backend running with Mongoose"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const connectDB = require("./config/db");

// // Route Imports
// const authRoutes = require("./routes/authRoutes");
// const movieRoutes = require("./routes/movies");
// const reviewRoutes = require("./routes/reviews");

// // Middleware Import (Fixed path from '../' to './')
// // Assuming 'middleware' folder is inside 'backend' folder
// const authMiddleware = require("./middleware/authMiddleware"); 

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Database Connection
// connectDB();

// // Mount Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/movies", movieRoutes);
// app.use("/api/reviews", reviewRoutes);

// // Simple Health Check
// app.get("/", (req, res) => res.send("Backend running with Mongoose"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const reviewRoutes = require("./routes/reviews");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// mount routes ONCE
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => res.send("Backend running with Mongoose"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
