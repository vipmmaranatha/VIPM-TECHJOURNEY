const db = require("../db");

// ========================================
// GET CONTACT INFORMATION
// ========================================

const getContact = (req, res) => {

    res.json({

        message: "Contact controller is working!",

        contact: {
            email: "vipmmaranatha03@gmail.com",
            phone: "+255 786 459 085",
            location: "NIT Mabibo, Dar es Salaam"
        }

    });

};


// ========================================
// SUBMIT CONTACT MESSAGE
// ========================================

const submitContact = (req, res) => {

    const { fullName, email, subject, message } = req.body;

    // Validate fields
    if (!fullName || !email || !subject || !message) {

        return res.status(400).json({
            message: "Please fill in all fields."
        });

    }

    const sql = `
        INSERT INTO contact_messages
        (full_name, email, subject, message)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [fullName, email, subject, message],
        (err, result) => {

            if (err) {

                console.error("Database error:", err);

                return res.status(500).json({
                    message: "Failed to save contact message."
                });

            }

            res.status(201).json({

                message: "Contact message received successfully!",

                data: {
                    id: result.insertId,
                    fullName: fullName,
                    email: email,
                    subject: subject,
                    message: message,
                    status: "unread"
                }

            });

        }
    );

};


// ========================================
// GET ALL CONTACT MESSAGES
// ========================================

const getMessages = (req, res) => {

    const sql = `
        SELECT *
        FROM contact_messages
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error("Database error:", err);

            return res.status(500).json({
                message: "Failed to retrieve contact messages."
            });

        }

        res.status(200).json({

            message: "Contact messages retrieved successfully!",

            count: results.length,

            messages: results

        });

    });

};


// ========================================
// MARK MESSAGE AS READ
// ========================================

const markMessageAsRead = (req, res) => {

    const { id } = req.params;

    // Validate ID
    if (!id) {

        return res.status(400).json({
            message: "Message ID is required."
        });

    }

    const sql = `
        UPDATE contact_messages
        SET status = 'read'
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.error("Database error:", err);

            return res.status(500).json({
                message: "Failed to mark message as read."
            });

        }

        // Message does not exist
        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Message not found."
            });

        }

        // Successfully marked as read
        res.status(200).json({

            message: "Message marked as read successfully!"

        });

    });

};


// ========================================
// DELETE CONTACT MESSAGE
// ========================================

const deleteMessage = (req, res) => {

    const { id } = req.params;

    // Validate ID
    if (!id) {

        return res.status(400).json({
            message: "Message ID is required."
        });

    }

    const sql = `
        DELETE FROM contact_messages
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.error("Database error:", err);

            return res.status(500).json({
                message: "Failed to delete contact message."
            });

        }

        // Message does not exist
        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Message not found."
            });

        }

        // Successfully deleted
        res.status(200).json({

            message: "Contact message deleted successfully!"

        });

    });

};


// ========================================
// EXPORT CONTROLLERS
// ========================================

module.exports = {

    getContact,
    submitContact,
    getMessages,
    markMessageAsRead,
    deleteMessage

};