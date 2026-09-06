const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const portfolioController = require("../controllers/portfolioController");

router.post("/", auth, portfolioController.savePortfolio);
router.get("/me", auth, portfolioController.getMyPortfolio);

module.exports = router;
