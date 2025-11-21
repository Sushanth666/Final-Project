// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const header = req.headers.authorization;
//   if (!header) return res.status(401).json({ message: "No token" });

//   const token = header.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Invalid token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token invalid" });
//   }
// };
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
