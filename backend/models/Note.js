const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
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

    approach: {
      type: String,
      default: ""
    },

    mistakes: {
      type: String,
      default: ""
    },

    timeComplexity: {
      type: String,
      default: ""
    },

    spaceComplexity: {
      type: String,
      default: ""
    },

    revisionNotes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema);