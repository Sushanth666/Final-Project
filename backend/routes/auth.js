// // File: routes/auth.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Import the User model
// const router = express.Router();
// // --- 1. REGISTER ROUTE ---
// // Path: POST /api/auth/register
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create new user
//     user = new User({
//       email,
//       password
//     });

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     // Save user to database
//     await user.save();

//     // Create and send a token
//     const payload = {
//       user: {
//         id: user.id // This is the user's ID from MongoDB
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '4h' }, // Token expires in 4 hour
//       (err, token) => {
//         if (err) throw err;
//         res.status(201).json({ token }); // Send token back
//       }
//     );

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

// // --- 2. LOGIN ROUTE ---
// // Path: POST /api/auth/login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Compare submitted password with hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create and send a token
//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '4h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token }); // Send token back
//       }
//     );

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { name, photo } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, photo },
      { new: true }
    );

    res.json({ user, message: "Profile updated" });
  } catch (err) {
    console.log("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error updating profile" });
  }
});
module.exports = router;
