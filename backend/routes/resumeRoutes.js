const express = require("express");
const path = require("path");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const Resume = require("../models/Resume");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    upload.single("resume"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "Please upload a PDF file"
                });
            }

            const { title, tags } = req.body;

            if (!title || !title.trim()) {
                return res.status(400).json({
                    message: "Please provide a title"
                });
            }

            const parsedTags = tags
                ? tags.split(",").map(t => t.trim()).filter(Boolean)
                : [];

            const resume = await Resume.create({
                user: req.user.id,
                title: title.trim(),
                originalName: req.file.originalname,
                filename: req.file.filename,
                filePath: req.file.path,
                fileSize: req.file.size,
                tags: parsedTags
            });

            res.status(201).json(resume);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    }
);

router.get("/", authMiddleware, async (req, res) => {
    try {
        const resumes = await Resume.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(resumes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const filePath = path.resolve(resume.filePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await Resume.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Resume deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;