const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtSecret, jwtExpiresIn } = require("../config/env");

class AuthError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const signup = async ({ username, name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new AuthError("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ username, name, email, password: hashedPassword });
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new AuthError("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AuthError("Invalid credentials");

  return jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: jwtExpiresIn });
};

module.exports = { signup, login, AuthError };
