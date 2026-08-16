const Skill = require("../models/skill");

const createSkill = async (req, res) => {
    try {
        const { name, description, category } = req.body;

        if (!name || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Name, description and category are required"
            });
        }

        const existingSkill = await Skill.findOne({ name });

        if (existingSkill) {
            return res.status(409).json({
                success: false,
                message: "Skill already exists"
            });
        }

        const skill = await Skill.create({
            name,
            description,
            category
        });

        return res.status(201).json({
            success: true,
            message: "Skill created successfully",
            skill
        });

    } catch (error) {
        console.error("Create skill error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: skills.length,
            skills
        });

    } catch (error) {
        console.error("Get skills error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    createSkill,
    getSkills
};