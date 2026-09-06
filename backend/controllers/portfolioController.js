const asyncHandler = require("../utils/asyncHandler");
const portfolioService = require("../services/portfolioService");

const savePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await portfolioService.upsertPortfolio(req.user.userId, req.body);
  res.json({ message: "Portfolio saved!", portfolio });
});

const getMyPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await portfolioService.getPortfolioByUser(req.user.userId);
  res.json(portfolio);
});

module.exports = { savePortfolio, getMyPortfolio };
