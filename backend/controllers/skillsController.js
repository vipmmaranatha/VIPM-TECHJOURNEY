const db = require("../db");

// =========================================================
// GET ALL SKILLS
// GET /api/skills
// =========================================================

const getSkills = (req, res) => {

    const { status } = req.query;

    let sql = `
        SELECT
            id,
            category,
            name,
            progress,
            status,
            created_at,
            updated_at
        FROM skills
    `;

    // By default return active skills.
    // Admin can use ?status=all to return active + draft.
    if (status !== "all") {
        sql += ` WHERE status = 'active'`;
    }

    sql += `
        ORDER BY category ASC, id ASC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error("Get skills error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch skills.",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: results.length,
            skills: results
        });
    });
};


// =========================================================
// GET SKILL BY ID
// GET /api/skills/:id
// =========================================================

const getSkillById = (req, res) => {

    const { id } = req.params;

    if (!id) {

        return res.status(400).json({
            success: false,
            message: "Skill ID is required."
        });
    }

    const sql = `
        SELECT
            id,
            category,
            name,
            progress,
            status,
            created_at,
            updated_at
        FROM skills
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {

            console.error("Get skill by ID error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch skill.",
                error: err.message
            });
        }

        if (results.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Skill not found."
            });
        }

        res.status(200).json({
            success: true,
            skill: results[0]
        });
    });
};


// =========================================================
// CREATE SKILL
// POST /api/skills
// =========================================================

const createSkill = (req, res) => {

    const {
        category,
        name,
        progress,
        status
    } = req.body;


    // Required fields
    if (!category || !name) {

        return res.status(400).json({
            success: false,
            message: "Category and skill name are required."
        });
    }


    // Convert progress to number
    const skillProgress =
        progress === undefined || progress === ""
            ? 0
            : Number(progress);


    // Validate progress
    if (
        Number.isNaN(skillProgress) ||
        skillProgress < 0 ||
        skillProgress > 100
    ) {

        return res.status(400).json({
            success: false,
            message: "Progress must be a number between 0 and 100."
        });
    }


    // Only active or draft
    const skillStatus =
        status === "draft"
            ? "draft"
            : "active";


    const sql = `
        INSERT INTO skills
        (
            category,
            name,
            progress,
            status
        )
        VALUES (?, ?, ?, ?)
    `;


    const values = [
        category.trim(),
        name.trim(),
        skillProgress,
        skillStatus
    ];


    db.query(sql, values, (err, result) => {

        if (err) {

            console.error("Create skill error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to create skill.",
                error: err.message
            });
        }


        res.status(201).json({
            success: true,
            message: "Skill created successfully!",
            skillId: result.insertId
        });
    });
};


// =========================================================
// UPDATE SKILL
// PUT /api/skills/:id
// =========================================================

const updateSkill = (req, res) => {

    const { id } = req.params;

    const {
        category,
        name,
        progress,
        status
    } = req.body;


    // Check ID
    if (!id) {

        return res.status(400).json({
            success: false,
            message: "Skill ID is required."
        });
    }


    // Required fields
    if (!category || !name) {

        return res.status(400).json({
            success: false,
            message: "Category and skill name are required."
        });
    }


    // Convert progress to number
    const skillProgress =
        progress === undefined || progress === ""
            ? 0
            : Number(progress);


    // Validate progress
    if (
        Number.isNaN(skillProgress) ||
        skillProgress < 0 ||
        skillProgress > 100
    ) {

        return res.status(400).json({
            success: false,
            message: "Progress must be a number between 0 and 100."
        });
    }


    // Only active or draft
    const skillStatus =
        status === "draft"
            ? "draft"
            : "active";


    const sql = `
        UPDATE skills
        SET
            category = ?,
            name = ?,
            progress = ?,
            status = ?
        WHERE id = ?
    `;


    const values = [
        category.trim(),
        name.trim(),
        skillProgress,
        skillStatus,
        id
    ];


    db.query(sql, values, (err, result) => {

        if (err) {

            console.error("Update skill error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to update skill.",
                error: err.message
            });
        }


        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Skill not found."
            });
        }


        res.status(200).json({
            success: true,
            message: "Skill updated successfully!"
        });
    });
};


// =========================================================
// DELETE SKILL
// DELETE /api/skills/:id
// =========================================================

const deleteSkill = (req, res) => {

    const { id } = req.params;


    if (!id) {

        return res.status(400).json({
            success: false,
            message: "Skill ID is required."
        });
    }


    const sql = `
        DELETE FROM skills
        WHERE id = ?
    `;


    db.query(sql, [id], (err, result) => {

        if (err) {

            console.error("Delete skill error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to delete skill.",
                error: err.message
            });
        }


        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Skill not found."
            });
        }


        res.status(200).json({
            success: true,
            message: "Skill deleted successfully!"
        });
    });
};


// =========================================================
// EXPORT CONTROLLERS
// =========================================================

module.exports = {
    getSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill
};