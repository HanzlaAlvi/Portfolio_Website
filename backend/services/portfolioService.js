const Portfolio = require("../models/Portfolio");

const PORTFOLIO_FIELDS = [
  "name",
  "expertise",
  "description",
  "descriptionskills",
  "githubLink",
  "linkedinLink",
  "fbLink",
  "InstaLink",
  "skills",
  "projects",
];

const pickPortfolioFields = (body) =>
  PORTFOLIO_FIELDS.reduce((acc, field) => {
    if (body[field] !== undefined) acc[field] = body[field];
    return acc;
  }, {});

const upsertPortfolio = (userId, body) => {
  const data = pickPortfolioFields(body);
  return Portfolio.findOneAndUpdate(
    { user: userId },
    { $set: data, $setOnInsert: { user: userId } },
    { new: true, upsert: true, runValidators: true }
  );
};

const getPortfolioByUser = (userId) => Portfolio.findOne({ user: userId });

module.exports = { upsertPortfolio, getPortfolioByUser };
