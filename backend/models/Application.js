const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        role: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            default: "",
            trim: true
        },

        applicationDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "OA Scheduled",
                "OA Completed",
                "Interview Scheduled",
                "Rejected",
                "Offer Received"
            ],
            default: "Applied"
        },

        jobLink: {
            type: String,
            default: "",
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

module.exports = mongoose.model("Application", applicationSchema);