const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const UserProgress = require("../models/UserProgress");

const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
    try {

        const { problemId, status } = req.body;

        let progress = await UserProgress.findOne({
            user: req.user.id,
            problem: problemId
        });

        if (progress) {

            progress.status = status;

            await progress.save();

        } else {

            progress = await UserProgress.create({
                user: req.user.id,
                problem: problemId,
                status
            });

        }

        res.status(200).json(progress);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
});
router.get("/", authMiddleware, async (req, res) => {
    try {

        const progress = await UserProgress.find({
            user: req.user.id
        }).populate("problem");

        res.status(200).json(progress);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
});
router.get("/stats", authMiddleware, async (req, res) => {
    try {

        const progress = await UserProgress.find({
            user: req.user.id
        });

        const solved = progress.filter(
            p => p.status === "Solved"
        ).length;

        const attempted = progress.filter(
            p => p.status === "Attempted"
        ).length;

        const revisionNeeded = progress.filter(
            p => p.status === "Revision Needed"
        ).length;

        res.status(200).json({
            solved,
            attempted,
            revisionNeeded,
            totalTracked: progress.length
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
});
module.exports = router;