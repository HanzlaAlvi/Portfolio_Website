// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err.message));


// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/portfolio", require("./routes/portfolio"));
app.use("/api/contact", require("./routes/contactRoutes")); 

app.listen(5000, () => console.log("Server running on port 5000"));