const express = require("express");

const {
    createSkill,
    getSkills
} = require("../controllers/skillsController");

const router = express.Router();

router.post("/", createSkill);

router.get("/", getSkills);

module.exports = router;