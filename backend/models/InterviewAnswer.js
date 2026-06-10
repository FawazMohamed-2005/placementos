const mongoose = require("mongoose");

const interviewAnswerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

 
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

        question: {
            type: String,
            required: true,
            trim: true
        },


        answer: {
            type: String,
            required: true,
            trim: true
        },

   
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