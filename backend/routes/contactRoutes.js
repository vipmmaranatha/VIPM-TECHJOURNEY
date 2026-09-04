const express = require("express");

const router = express.Router();

const {
    getContact,
    submitContact,
    getMessages,
    markMessageAsRead,
    deleteMessage
} = require("../controllers/contactController");


// ========================================
// GET CONTACT INFORMATION
// ========================================

router.get("/", getContact);


// ========================================
// SUBMIT CONTACT MESSAGE
// ========================================

router.post("/", submitContact);


// ========================================
// GET ALL CONTACT MESSAGES
// ========================================

router.get("/messages", getMessages);


// ========================================
// MARK MESSAGE AS READ
// ========================================

router.put("/:id/read", markMessageAsRead);


// ========================================
// DELETE CONTACT MESSAGE
// ========================================

router.delete("/:id", deleteMessage);


module.exports = router;