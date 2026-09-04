const db = require("../db");


// ========================================
// GET ALL PROJECTS
// ========================================

const getProjects = (req, res) => {

    const sql = `
        SELECT *
        FROM projects
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error(
                "Database error:",
                err
            );

            return res.status(500).json({
                message: "Failed to fetch projects."
            });
        }

        res.status(200).json({
            count: results.length,
            projects: results
        });

    });
};


// ========================================
// GET SINGLE PROJECT
// ========================================

const getProjectById = (req, res) => {

    const { id } = req.params;

    if (!id) {

        return res.status(400).json({
            message: "Project ID is required."
        });
    }

    const sql = `
        SELECT *
        FROM projects
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {

            console.error(
                "Database error:",
                err
            );

            return res.status(500).json({
                message: "Failed to fetch project."
            });
        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "Project not found."
            });
        }

        res.status(200).json({
            project: results[0]
        });

    });
};


// ========================================
// CREATE PROJECT
// ========================================

const createProject = (req, res) => {

    const {
        title,
        description,
        category,
        technologies,
        image,
        project_url,
        github_url,
        status
    } = req.body;


    // Validation

    if (
        !title ||
        !description ||
        !category
    ) {

        return res.status(400).json({
            message:
                "Title, description and category are required."
        });
    }


    const sql = `
        INSERT INTO projects
        (
            title,
            description,
            category,
            technologies,
            image,
            project_url,
            github_url,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const values = [
        title,
        description,
        category,
        technologies || null,
        image || null,
        project_url || null,
        github_url || null,
        status || "active"
    ];


    db.query(
        sql,
        values,
        (err, result) => {

            if (err) {

                console.error(
                    "Database error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Failed to create project."
                });
            }


            res.status(201).json({

                message:
                    "Project created successfully!",

                projectId:
                    result.insertId

            });

        }
    );
};


// ========================================
// UPDATE PROJECT
// ========================================

const updateProject = (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        category,
        technologies,
        image,
        project_url,
        github_url,
        status
    } = req.body;


    if (!id) {

        return res.status(400).json({
            message: "Project ID is required."
        });
    }


    if (
        !title ||
        !description ||
        !category
    ) {

        return res.status(400).json({
            message:
                "Title, description and category are required."
        });
    }


    const sql = `
        UPDATE projects
        SET
            title = ?,
            description = ?,
            category = ?,
            technologies = ?,
            image = ?,
            project_url = ?,
            github_url = ?,
            status = ?
        WHERE id = ?
    `;


    const values = [
        title,
        description,
        category,
        technologies || null,
        image || null,
        project_url || null,
        github_url || null,
        status || "active",
        id
    ];


    db.query(
        sql,
        values,
        (err, result) => {

            if (err) {

                console.error(
                    "Database error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Failed to update project."
                });
            }


            if (
                result.affectedRows === 0
            ) {

                return res.status(404).json({
                    message:
                        "Project not found."
                });
            }


            res.status(200).json({

                message:
                    "Project updated successfully!"

            });

        }
    );
};


// ========================================
// DELETE PROJECT
// ========================================

const deleteProject = (req, res) => {

    const { id } = req.params;


    if (!id) {

        return res.status(400).json({
            message:
                "Project ID is required."
        });
    }


    const sql = `
        DELETE FROM projects
        WHERE id = ?
    `;


    db.query(
        sql,
        [id],
        (err, result) => {

            if (err) {

                console.error(
                    "Database error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Failed to delete project."
                });
            }


            if (
                result.affectedRows === 0
            ) {

                return res.status(404).json({
                    message:
                        "Project not found."
                });
            }


            res.status(200).json({

                message:
                    "Project deleted successfully!"

            });

        }
    );
};


// ========================================
// EXPORT
// ========================================

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};