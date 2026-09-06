const asyncHandler = require("../utils/asyncHandler");
const contactService = require("../services/contactService");

const createContact = asyncHandler(async (req, res) => {
  const contact = await contactService.createContact(req.params.userId, req.body);
  res.status(201).json({ message: "Message sent successfully!", contact });
});

const getMyContacts = asyncHandler(async (req, res) => {
  const contacts = await contactService.getContactsByUser(req.user.userId);
  res.json({ contacts });
});

module.exports = { createContact, getMyContacts };
