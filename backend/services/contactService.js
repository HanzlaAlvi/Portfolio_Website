const mongoose = require("mongoose");
const Contact = require("../models/Contact");

class ContactError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createContact = (userId, { name, email, message, type }) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ContactError("Invalid user ID");
  }
  return Contact.create({ user: userId, name, email, message, type: type || "portfolio" });
};

const getContactsByUser = (userId) => Contact.find({ user: userId }).sort({ createdAt: -1 });

module.exports = { createContact, getContactsByUser, ContactError };
