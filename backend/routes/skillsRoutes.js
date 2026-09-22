const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");

const {
    createSkill,
    getSkills
} = require("../controllers/skillsController");

const router = express.Router();

router.post("/", authMiddleware, createSkill);

router.get("/", getSkills);

module.exports = router;