const express = require("express");
const Problem = require("../models/Problem");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const problems = await Problem.find();

        res.status(200).json(problems);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;