const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/authService");

const signup = asyncHandler(async (req, res) => {
  await authService.signup(req.body);
  res.status(201).json({ message: "Signup successful!" });
});

const login = asyncHandler(async (req, res) => {
  const token = await authService.login(req.body);
  res.json({ message: "Login successful", token });
});

module.exports = { signup, login };
