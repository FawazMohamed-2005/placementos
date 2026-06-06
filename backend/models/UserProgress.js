const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true
        },

        status: {
            type: String,
            enum: [
                "Attempted",
                "Solved",
                "Revision Needed"
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "UserProgress",
    userProgressSchema
);