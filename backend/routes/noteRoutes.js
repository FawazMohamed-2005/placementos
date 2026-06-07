const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Note = require("../models/Note");

const router = express.Router();

// GET /notes/:problemId
// Fetch note for this user + problem
router.get("/:problemId", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOne({
      user: req.user.id,
      problem: req.params.problemId
    });

    // Return empty structure if no note yet
    if (!note) {
      return res.status(200).json({
        approach: "",
        mistakes: "",
        timeComplexity: "",
        spaceComplexity: "",
        revisionNotes: ""
      });
    }

    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /notes/:problemId
// Create or update note (upsert)
router.post("/:problemId", authMiddleware, async (req, res) => {
  try {
    const {
      approach,
      mistakes,
      timeComplexity,
      spaceComplexity,
      revisionNotes
    } = req.body;

    const note = await Note.findOneAndUpdate(
      {
        user: req.user.id,
        problem: req.params.problemId
      },
      {
        approach,
        mistakes,
        timeComplexity,
        spaceComplexity,
        revisionNotes
      },
      {
        upsert: true,      // create if not exists
        new: true          // return updated doc
      }
    );

    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;