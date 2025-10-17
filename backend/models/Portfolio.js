const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name:         String,
  expertise:    String,
  description:  String,
  descriptionskills: String,
  githubLink:   String,
  linkedinLink: String,
  fbLink:       String,
  InstaLink:    String,
  skills: [
    {
      skill: String,
      percentage: String,
    },
  ],
  projects: [
    {
      title: String,
      description: String,
    },
  ],
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);