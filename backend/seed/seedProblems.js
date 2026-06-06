const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Problem = require("../models/Problem");

dotenv.config();
const problems = [
    {
        title: "Two Sum",
        difficulty: "Easy",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/two-sum/",
        sheets: ["Blind 75", "NeetCode 150"]
    },

    {
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        sheets: ["Blind 75", "NeetCode 150"]
    },

    {
        title: "Contains Duplicate",
        difficulty: "Easy",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/contains-duplicate/",
        sheets: ["Blind 75", "NeetCode 150"]
    },

    {
        title: "Valid Anagram",
        difficulty: "Easy",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/valid-anagram/",
        sheets: ["Blind 75", "NeetCode 150"]
    },

    {
        title: "Valid Parentheses",
        difficulty: "Easy",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/valid-parentheses/",
        sheets: ["Blind 75", "NeetCode 150"]
    }
];
const seedProblems = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        await Problem.deleteMany();

        await Problem.insertMany(problems);

        console.log("Problems Seeded Successfully");

        process.exit();

    } catch (error) {
    console.error(error);
    process.exit(1);
}
};

seedProblems();