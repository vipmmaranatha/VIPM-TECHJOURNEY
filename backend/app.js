const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

console.log("RUNNING APP FILE:", __filename);

const app = express();
const PORT = 3000;

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(cors());
app.use(express.json());

// =========================================================
// HOME ROUTE
// =========================================================

app.get("/", (req, res) => {
    res.status(200).send("Hello from VIPM TECHJOURNEY!");
});

// =========================================================
// TEST DELETE ROUTE
// =========================================================

app.delete("/api/test-delete", (req, res) => {
    console.log("TEST DELETE ROUTE HIT");

    res.status(200).json({
        success: true,
        message: "DELETE route is working!"
    });
});

// =========================================================
// IMPORT ROUTES
// =========================================================

const projectsRoutes = require("./routes/projectsRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const contactRoutes = require("./routes/contactRoutes");

// =========================================================
// API ROUTES
// =========================================================

// Projects
app.use("/api/projects", projectsRoutes);

// Skills
app.use("/api/skills", skillsRoutes);

// Contact / Messages
app.use("/api/contact", contactRoutes);

// =========================================================
// SERVE FRONTEND
// =========================================================

app.use(express.static(path.join(__dirname, "..")));

// =========================================================
// START SERVER
// =========================================================

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});