const express = require("express");
const Groq = require("groq-sdk");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Helper function
const callAI = async (prompt) => {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "llama-3.1-8b-instant",
        max_tokens: 1024
    });
    return completion.choices[0].message.content;
};

// ─────────────────────────────────────────
// POST /ai/dsa-mentor
// ─────────────────────────────────────────
router.post("/dsa-mentor", authMiddleware, async (req, res) => {
    try {
        const { problemTitle, topic, difficulty, doubt } = req.body;

        if (!problemTitle || !doubt) {
            return res.status(400).json({
                message: "Problem title and doubt are required"
            });
        }

        const prompt = `You are a DSA mentor helping a student preparing for placement interviews.

Problem: ${problemTitle}
Topic: ${topic}
Difficulty: ${difficulty}
Student's doubt: ${doubt}

Instructions:
- Give hints and guidance but DO NOT give the complete solution or full code
- Help them think through the approach step by step
- Mention time and space complexity to aim for if relevant
- Keep response concise, clear and encouraging
- Use simple language for a placement student`;

        const response = await callAI(prompt);
        res.status(200).json({ response });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "AI service error"
        });
    }
});

// ─────────────────────────────────────────
// POST /ai/resume-review
// ─────────────────────────────────────────
router.post("/resume-review", authMiddleware, async (req, res) => {
    try {
        const { resumeTitle, resumeText } = req.body;

        if (!resumeText || !resumeText.trim()) {
            return res.status(400).json({
                message: "Resume text is required"
            });
        }

        const prompt = `You are an expert resume reviewer helping a student prepare for placement interviews at top tech companies.

Resume Title: ${resumeTitle}

Resume Content:
${resumeText}

Please review this resume and provide structured feedback with these exact sections:

Overall Assessment:
Write 2-3 lines summarizing the resume quality.

Strengths:
List 3-4 strong points about this resume.

Areas to Improve:
List 3-4 specific things that should be improved.

ATS Score Estimate:
Give an estimated score out of 100 with a brief reason.

Top 3 Recommendations:
The 3 most important changes to make immediately.

Keep feedback practical and actionable for a student targeting product companies.`;

        const response = await callAI(prompt);
        res.status(200).json({ response });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "AI service error"
        });
    }
});

// ─────────────────────────────────────────
// POST /ai/interview-coach
// ─────────────────────────────────────────
router.post("/interview-coach", authMiddleware, async (req, res) => {
    try {
        const { question, answer, category } = req.body;

        if (!question || !answer) {
            return res.status(400).json({
                message: "Question and answer are required"
            });
        }

        const prompt = `You are an experienced interviewer at a top tech company helping a student prepare for placement interviews.

Category: ${category}
Interview Question: ${question}
Student's Answer: ${answer}

Please evaluate this answer with these exact sections:

Score:
Give a score out of 10 with a brief reason.

What Was Good:
List 2-3 things the student did well.

What Was Missing:
List 2-3 important points that were missing or weak.

Improved Answer Structure:
Give a brief outline of how a strong answer should be structured. Do NOT write the full answer.

One Key Tip:
The single most important thing to remember for this type of question.

Be encouraging but honest. Keep feedback concise and actionable.`;

        const response = await callAI(prompt);
        res.status(200).json({ response });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "AI service error"
        });
    }
});

module.exports = router;