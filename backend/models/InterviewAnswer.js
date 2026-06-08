const mongoose = require("mongoose");

const interviewAnswerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Category groups the question
        // Introduction / Strengths / Behavioral / Company
        category: {
            type: String,
            enum: [
                "Introduction",
                "Strengths & Weaknesses",
                "Behavioral",
                "Projects",
                "Company Specific",
                "Other"
            ],
            required: true
        },

        // The question itself
        question: {
            type: String,
            required: true,
            trim: true
        },

        // Student's prepared answer
        answer: {
            type: String,
            required: true,
            trim: true
        },

        // Optional notes like "use STAR format"
        notes: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "InterviewAnswer",
    interviewAnswerSchema
);