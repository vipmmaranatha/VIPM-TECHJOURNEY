const express = require("express");

const router = express.Router();

// =========================================================
// IMPORT CONTROLLERS
// =========================================================

const {
    getSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill
} = require("../controllers/skillsController");


// =========================================================
// SKILLS ROUTES
// =========================================================

// GET ALL SKILLS
// GET http://localhost:3000/api/skills
router.get("/", getSkills);


// GET SINGLE SKILL
// GET http://localhost:3000/api/skills/:id
router.get("/:id", getSkillById);


// CREATE NEW SKILL
// POST http://localhost:3000/api/skills
router.post("/", createSkill);


// UPDATE SKILL
// PUT http://localhost:3000/api/skills/:id
router.put("/:id", updateSkill);


// DELETE SKILL
// DELETE http://localhost:3000/api/skills/:id
router.delete("/:id", deleteSkill);


// =========================================================
// EXPORT ROUTER
// =========================================================

module.exports = router;