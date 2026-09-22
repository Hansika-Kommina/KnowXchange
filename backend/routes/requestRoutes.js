const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createRequest,
    getRequests,
    acceptRequest,
    rejectRequest
} = require("../controllers/requestController");

const router = express.Router();

router.post("/", authMiddleware, createRequest);

router.get("/", authMiddleware, getRequests);

router.put("/:id/accept", authMiddleware, acceptRequest);

router.put("/:id/reject", authMiddleware, rejectRequest);

module.exports = router;