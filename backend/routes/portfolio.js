const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, auth denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token invalid" });
  }
};

// Save/Update Portfolio
router.post("/", auth, async (req, res) => {
  const {
    name,
    expertise,
    description,
    descriptionskills,
    githubLink,
    linkedinLink,
    fbLink,
    InstaLink,
    skills,
    projects,
  } = req.body;
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.userId });
    if (!portfolio) {
      portfolio = new Portfolio({
        user: req.user.userId,
        name,
        expertise,
        description,
        descriptionskills,
        githubLink,
        linkedinLink,
        fbLink,
        InstaLink,
        skills,
        projects,
      });
    } else {
      Object.assign(portfolio, {
        name,
        expertise,
        description,
        descriptionskills,
        githubLink,
        linkedinLink,
        fbLink,
        InstaLink,
        skills,
        projects,
      });
    }
    await portfolio.save();
    res.json({ message: "Portfolio saved!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Portfolio for logged-in user
router.get("/me", auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.userId });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;