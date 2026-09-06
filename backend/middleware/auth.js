const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, auth denied" });

  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = auth;
