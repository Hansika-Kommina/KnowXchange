const SkillRequest = require("../models/SkillRequest");
const User = require("../models/User");
const Skill = require("../models/skill");

const createRequest = async (req, res) => {
    try {
        const requester = req.user;
        const { skillId, receiverId } = req.body;

        if (!skillId || !receiverId) {
            return res.status(400).json({
                success: false,
                message: "skillId and receiverId are required"
            });
        }

        if (requester.toString() === receiverId.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot send a request to yourself"
            });
        }

        const skill = await Skill.findById(skillId);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        const receiver = await User.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({
                success: false,
                message: "Receiver not found"
            });
        }

        const existingRequest = await SkillRequest.findOne({
            requester,
            skill: skillId,
            receiver: receiverId,
            status: "pending"
        });

        if (existingRequest) {
            return res.status(409).json({
                success: false,
                message: "A pending request already exists"
            });
        }

        const request = await SkillRequest.create({
            requester,
            skill: skillId,
            receiver: receiverId
        });

        const populatedRequest = await request.populate([
            { path: "requester", select: "name email" },
            { path: "skill", select: "name description category" },
            { path: "receiver", select: "name email" }
        ]);

        return res.status(201).json({
            success: true,
            message: "Skill request created successfully",
            request: populatedRequest
        });

    } catch (error) {
        console.error("Create request error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const getRequests = async (req, res) => {
    try {
        const requests = await SkillRequest.find({
            $or: [
                { requester: req.user },
                { receiver: req.user }
            ]
        })
            .populate("requester", "name email")
            .populate("receiver", "name email")
            .populate("skill", "name description category")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: requests.length,
            requests
        });

    } catch (error) {
        console.error("Get requests error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const acceptRequest = async (req, res) => {
    try {
        const request = await SkillRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        if (request.receiver.toString() !== req.user.toString()) {
            return res.status(403).json({
                success: false,
                message: "Only the receiver can accept this request"
            });
        }

        if (request.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Only pending requests can be accepted"
            });
        }

        request.status = "accepted";
        await request.save();

        const updatedRequest = await request.populate([
            { path: "requester", select: "name email" },
            { path: "skill", select: "name description category" },
            { path: "receiver", select: "name email" }
        ]);

        return res.status(200).json({
            success: true,
            message: "Skill request accepted",
            request: updatedRequest
        });

    } catch (error) {
        console.error("Accept request error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const rejectRequest = async (req, res) => {
    try {
        const request = await SkillRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        if (request.receiver.toString() !== req.user.toString()) {
            return res.status(403).json({
                success: false,
                message: "Only the receiver can reject this request"
            });
        }

        if (request.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Only pending requests can be rejected"
            });
        }

        request.status = "rejected";
        await request.save();

        const updatedRequest = await request.populate([
            { path: "requester", select: "name email" },
            { path: "skill", select: "name description category" },
            { path: "receiver", select: "name email" }
        ]);

        return res.status(200).json({
            success: true,
            message: "Skill request rejected",
            request: updatedRequest
        });

    } catch (error) {
        console.error("Reject request error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createRequest,
    getRequests,
    acceptRequest,
    rejectRequest
};