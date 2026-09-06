const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const contactController = require("../controllers/contactController");

// Public: a visitor can send a message to a portfolio owner without logging in
router.post("/:userId", contactController.createContact);

// Protected: only the authenticated owner can read messages sent to them
router.get("/me", auth, contactController.getMyContacts);

module.exports = router;
