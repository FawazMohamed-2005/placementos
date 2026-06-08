const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const InterviewAnswer = require("../models/InterviewAnswer");

const router = express.Router();

// GET /interview
// Get all answers for logged in user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const answers = await InterviewAnswer.find({
            user: req.user.id
        }).sort({ category: 1, createdAt: -1 });

        res.status(200).json(answers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// POST /interview
// Create new answer
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { category, question, answer, notes } = req.body;

        if (!category || !question?.trim() || !answer?.trim()) {
            return res.status(400).json({
                message: "Category, question and answer are required"
            });
        }

        const newAnswer = await InterviewAnswer.create({
            user: req.user.id,
            category,
            question: question.trim(),
            answer: answer.trim(),
            notes: notes?.trim() || ""
        });

        res.status(201).json(newAnswer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// PUT /interview/:id
// Update answer
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updated = await InterviewAnswer.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                message: "Answer not found"
            });
        }

        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE /interview/:id
// Delete answer
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deleted = await InterviewAnswer.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({
                message: "Answer not found"
            });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;