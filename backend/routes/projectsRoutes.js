const express = require("express");

const router = express.Router();

const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require("../controllers/projectsController");


// ========================================
// GET ALL PROJECTS
// ========================================

router.get(
    "/",
    getProjects
);


// ========================================
// GET SINGLE PROJECT
// ========================================

router.get(
    "/:id",
    getProjectById
);


// ========================================
// CREATE PROJECT
// ========================================

router.post(
    "/",
    createProject
);


// ========================================
// UPDATE PROJECT
// ========================================

router.put(
    "/:id",
    updateProject
);


// ========================================
// DELETE PROJECT
// ========================================

router.delete(
    "/:id",
    deleteProject
);


module.exports = router;