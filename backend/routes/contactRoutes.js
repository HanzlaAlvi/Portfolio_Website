const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// ------------------- Routes -------------------

// Add new contact for a specific user
router.post("/:userId", async (req, res) => {
    const { userId } = req.params;
    const { name, email, message, type } = req.body;

    try {
        const contact = new Contact({
            user: userId,
            name,
            email,
            message,
            type: type || "portfolio",
        });

        await contact.save();
        res.status(201).json({ message: "Message sent successfully!", contact });
    } catch (err) {
        console.error("Contact save error:", err);
        
        // Agar ObjectId invalid hai toh specific error
        if (err.name === 'CastError') {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Get all contacts for a specific user
router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const contacts = await Contact.find({ user: userId }).sort({ createdAt: -1 });
        res.json({ contacts });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;