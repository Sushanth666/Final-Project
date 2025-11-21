// const express = require("express");

// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   getMe
// } = require("../controllers/authController");
// const auth = require("../middleware/auth");
// const { getMyReviews } = require("../controllers/reviewController");
// // REGISTER
// router.post("/register", registerUser);

// // LOGIN
// router.post("/login", loginUser);

// // GET LOGGED USER DATA
// router.get("/me", auth, getMe);

// router.put("/update-profile", requireAuth, async (req, res) => {
//   try {
//     const { name, photo } = req.body;

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, photo },
//       { new: true }
//     );

//     res.json({ user });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update profile" });
//   }
// });


// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const User = require("../models/User");

// // Update profile
// router.put("/update-profile", authMiddleware, async (req, res) => {
//   try {
//     const { name, photo } = req.body;

//     const updated = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, photo },
//       { new: true }
//     ).select("-password");

//     res.json({
//       success: true,
//       user: updated
//     });
//   } catch (err) {
//     console.log("UPDATE ERROR:", err);
//     res.status(500).json({ message: "Failed to update profile" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const requireAuth = require("../middleware/authMiddleware");
const { updateProfile } = require("../controllers/authController");

const upload = multer({ dest: "uploads/" });

// PUT - update profile
router.put(
  "/update-profile",
  authMiddleware,
  upload.single("photo"),
  updateProfile
);

module.exports = router;
