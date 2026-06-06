const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        difficulty: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"]
        },

        topic: {
            type: String,
            required: true,
            trim: true
        },

        platform: {
            type: String,
            default: "LeetCode"
        },

        link: {
            type: String,
            required: true
        },

        sheets: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Problem", problemSchema);