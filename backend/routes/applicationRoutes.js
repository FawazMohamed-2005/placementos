const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Application = require("../models/Application");

const router = express.Router();

// GET /applications
// Get all applications for logged in user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const applications = await Application.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// POST /applications
// Create new application
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            company,
            role,
            location,
            applicationDate,
            status,
            jobLink,
            notes
        } = req.body;

        const application = await Application.create({
            user: req.user.id,
            company,
            role,
            location,
            applicationDate,
            status,
            jobLink,
            notes
        });

        res.status(201).json(application);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET /applications/:id
// Get single application
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json(application);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// PUT /applications/:id
// Update application
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const application = await Application.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json(application);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE /applications/:id
// Delete application
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const application = await Application.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET /applications/stats/summary
// Get stats for dashboard
router.get("/stats/summary", authMiddleware, async (req, res) => {
    try {
        const applications = await Application.find({
            user: req.user.id
        });

        const total = applications.length;
        const applied = applications.filter(a => a.status === "Applied").length;
        const oa = applications.filter(a =>
            a.status === "OA Scheduled" ||
            a.status === "OA Completed"
        ).length;
        const interviewing = applications.filter(
            a => a.status === "Interview Scheduled"
        ).length;
        const rejected = applications.filter(
            a => a.status === "Rejected"
        ).length;
        const offers = applications.filter(
            a => a.status === "Offer Received"
        ).length;

        res.status(200).json({
            total,
            applied,
            oa,
            interviewing,
            rejected,
            offers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;