const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Problem = require("../models/Problem");

dotenv.config({ path: require("path").resolve(__dirname, "../.env") });
const problems = [

    // ─────────────────────────────────────────
    // ARRAY — 15 Problems
    // ─────────────────────────────────────────
    {
        title: "Two Sum",
        difficulty: "Easy",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/two-sum/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
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
        title: "Product of Array Except Self",
        difficulty: "Medium",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/product-of-array-except-self/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Maximum Subarray",
        difficulty: "Medium",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/maximum-subarray/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Maximum Product Subarray",
        difficulty: "Medium",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/maximum-product-subarray/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "3Sum",
        difficulty: "Medium",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/3sum/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Container With Most Water",
        difficulty: "Medium",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/container-with-most-water/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Merge Intervals",
        difficulty: "Medium",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/merge-intervals/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Sort Colors",
        difficulty: "Medium",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/sort-colors/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Next Permutation",
        difficulty: "Medium",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/next-permutation/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Trapping Rain Water",
        difficulty: "Hard",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/trapping-rain-water/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        topic: "Array",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/sliding-window-maximum/",
        sheets: ["NeetCode 150", "Striver SDE Sheet"]
    },

    // ─────────────────────────────────────────
    // STRING — 15 Problems
    // ─────────────────────────────────────────
    {
        title: "Valid Anagram",
        difficulty: "Easy",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/valid-anagram/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Valid Palindrome",
        difficulty: "Easy",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/valid-palindrome/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Reverse Words in a String",
        difficulty: "Medium",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/reverse-words-in-a-string/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Longest Repeating Character Replacement",
        difficulty: "Medium",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/longest-repeating-character-replacement/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Group Anagrams",
        difficulty: "Medium",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/group-anagrams/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Encode and Decode Strings",
        difficulty: "Medium",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/encode-and-decode-strings/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Palindromic Substrings",
        difficulty: "Medium",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/palindromic-substrings/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/longest-palindromic-substring/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "String to Integer (atoi)",
        difficulty: "Medium",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/string-to-integer-atoi/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Count and Say",
        difficulty: "Medium",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/count-and-say/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Roman to Integer",
        difficulty: "Easy",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/roman-to-integer/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Implement strStr",
        difficulty: "Easy",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Minimum Window Substring",
        difficulty: "Hard",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/minimum-window-substring/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Wildcard Matching",
        difficulty: "Hard",
        topic: "String",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/wildcard-matching/",
        sheets: ["Striver SDE Sheet"]
    },

    // ─────────────────────────────────────────
    // LINKED LIST — 15 Problems
    // ─────────────────────────────────────────
    {
        title: "Reverse Linked List",
        difficulty: "Easy",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/reverse-linked-list/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/merge-two-sorted-lists/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Linked List Cycle",
        difficulty: "Easy",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/linked-list-cycle/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Middle of the Linked List",
        difficulty: "Easy",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/middle-of-the-linked-list/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Reorder List",
        difficulty: "Medium",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/reorder-list/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Add Two Numbers",
        difficulty: "Medium",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/add-two-numbers/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Copy List with Random Pointer",
        difficulty: "Medium",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/copy-list-with-random-pointer/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Find the Duplicate Number",
        difficulty: "Medium",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/find-the-duplicate-number/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "LRU Cache",
        difficulty: "Medium",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/lru-cache/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Sort List",
        difficulty: "Medium",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/sort-list/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Palindrome Linked List",
        difficulty: "Easy",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/palindrome-linked-list/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Intersection of Two Linked Lists",
        difficulty: "Easy",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Flatten a Multilevel Doubly Linked List",
        difficulty: "Medium",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        topic: "Linked List",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/merge-k-sorted-lists/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },

    // ─────────────────────────────────────────
    // STACK — 15 Problems
    // ─────────────────────────────────────────
    {
        title: "Valid Parentheses",
        difficulty: "Easy",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/valid-parentheses/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Min Stack",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/min-stack/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Generate Parentheses",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/generate-parentheses/",
        sheets: ["NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Daily Temperatures",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/daily-temperatures/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Car Fleet",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/car-fleet/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Next Greater Element I",
        difficulty: "Easy",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/next-greater-element-i/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Next Greater Element II",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/next-greater-element-ii/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Asteroid Collision",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/asteroid-collision/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Decode String",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/decode-string/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Remove K Digits",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/remove-k-digits/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Maximum Rectangle",
        difficulty: "Hard",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/maximal-rectangle/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Simplify Path",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/simplify-path/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Basic Calculator II",
        difficulty: "Medium",
        topic: "Stack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/basic-calculator-ii/",
        sheets: ["Striver SDE Sheet"]
    },

    // ─────────────────────────────────────────
    // TREE — 15 Problems
    // ─────────────────────────────────────────
    {
        title: "Invert Binary Tree",
        difficulty: "Easy",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/invert-binary-tree/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Same Tree",
        difficulty: "Easy",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/same-tree/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Subtree of Another Tree",
        difficulty: "Easy",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/subtree-of-another-tree/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Lowest Common Ancestor of BST",
        difficulty: "Medium",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Binary Tree Right Side View",
        difficulty: "Medium",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/binary-tree-right-side-view/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Count Good Nodes in Binary Tree",
        difficulty: "Medium",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/validate-binary-search-tree/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Kth Smallest Element in BST",
        difficulty: "Medium",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Construct Binary Tree from Preorder and Inorder",
        difficulty: "Medium",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Path Sum II",
        difficulty: "Medium",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/path-sum-ii/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Diameter of Binary Tree",
        difficulty: "Easy",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/diameter-of-binary-tree/",
        sheets: ["NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Serialize and Deserialize Binary Tree",
        difficulty: "Hard",
        topic: "Tree",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
        sheets: ["Blind 75", "NeetCode 150"]
    },

    // ─────────────────────────────────────────
    // GRAPH — 15 Problems
    // ─────────────────────────────────────────
    {
        title: "Number of Islands",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/number-of-islands/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Clone Graph",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/clone-graph/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Max Area of Island",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/max-area-of-island/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Pacific Atlantic Water Flow",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Surrounded Regions",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/surrounded-regions/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Rotting Oranges",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/rotting-oranges/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Course Schedule",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/course-schedule/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Course Schedule II",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/course-schedule-ii/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Number of Connected Components in Graph",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Graph Valid Tree",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/graph-valid-tree/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Flood Fill",
        difficulty: "Easy",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/flood-fill/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Detect Cycle in Directed Graph",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/course-schedule/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Bipartite Graph Check",
        difficulty: "Medium",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/is-graph-bipartite/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Word Ladder",
        difficulty: "Hard",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/word-ladder/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Alien Dictionary",
        difficulty: "Hard",
        topic: "Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/alien-dictionary/",
        sheets: ["Blind 75", "NeetCode 150"]
    },

    // ─────────────────────────────────────────
    // DYNAMIC PROGRAMMING — 15 Problems
    // ─────────────────────────────────────────
    {
        title: "Climbing Stairs",
        difficulty: "Easy",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/climbing-stairs/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "House Robber",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/house-robber/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "House Robber II",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/house-robber-ii/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Longest Palindromic Subsequence",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/longest-palindromic-subsequence/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Coin Change",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/coin-change/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Longest Common Subsequence",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/longest-common-subsequence/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Word Break",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/word-break/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Combination Sum IV",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/combination-sum-iv/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Unique Paths",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/unique-paths/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Jump Game",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/jump-game/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/longest-increasing-subsequence/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "0/1 Knapsack Problem",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/partition-equal-subset-sum/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Edit Distance",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/edit-distance/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Burst Balloons",
        difficulty: "Hard",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/burst-balloons/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Regular Expression Matching",
        difficulty: "Hard",
        topic: "Dynamic Programming",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/regular-expression-matching/",
        sheets: ["Blind 75", "NeetCode 150"]
    },

    // ─────────────────────────────────────────
    // BINARY SEARCH — 15 Problems
    // ─────────────────────────────────────────
    {
        title: "Binary Search",
        difficulty: "Easy",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/binary-search/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Search a 2D Matrix",
        difficulty: "Medium",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/search-a-2d-matrix/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/koko-eating-bananas/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Find Minimum in Rotated Sorted Array II",
        difficulty: "Hard",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Search in Rotated Sorted Array II",
        difficulty: "Medium",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Time Based Key-Value Store",
        difficulty: "Medium",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/time-based-key-value-store/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Find Peak Element",
        difficulty: "Medium",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/find-peak-element/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Capacity to Ship Packages",
        difficulty: "Medium",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "First Bad Version",
        difficulty: "Easy",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/first-bad-version/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Square Root of Integer",
        difficulty: "Easy",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/sqrtx/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Aggressive Cows",
        difficulty: "Medium",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://www.spoj.com/problems/AGGRCOW/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Split Array Largest Sum",
        difficulty: "Hard",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/split-array-largest-sum/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Find K Closest Elements",
        difficulty: "Medium",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/find-k-closest-elements/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Count of Smaller Numbers After Self",
        difficulty: "Hard",
        topic: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
        sheets: ["Striver SDE Sheet"]
    },

    // ─────────────────────────────────────────
    // RECURSION & BACKTRACKING — 15 Problems
    // ─────────────────────────────────────────
    {
        title: "Subsets",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/subsets/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Subsets II",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/subsets-ii/",
        sheets: ["NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Permutations",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/permutations/",
        sheets: ["NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Combination Sum",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/combination-sum/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Combination Sum II",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/combination-sum-ii/",
        sheets: ["NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Word Search",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/word-search/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Palindrome Partitioning",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/palindrome-partitioning/",
        sheets: ["NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "N-Queens",
        difficulty: "Hard",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/n-queens/",
        sheets: ["NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Sudoku Solver",
        difficulty: "Hard",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/sudoku-solver/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Rat in a Maze",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "M Coloring Problem",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://www.geeksforgeeks.org/m-coloring-problem-backtracking-5/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Pow(x, n)",
        difficulty: "Medium",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/powx-n/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Word Search II",
        difficulty: "Hard",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/word-search-ii/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Expression Add Operators",
        difficulty: "Hard",
        topic: "Recursion",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/expression-add-operators/",
        sheets: ["Striver SDE Sheet"]
    },

    // ─────────────────────────────────────────
    // HEAP / PRIORITY QUEUE — 15 Problems
    // ─────────────────────────────────────────
    {
        title: "Kth Largest Element in Array",
        difficulty: "Medium",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Last Stone Weight",
        difficulty: "Easy",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/last-stone-weight/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "K Closest Points to Origin",
        difficulty: "Medium",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/k-closest-points-to-origin/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Task Scheduler",
        difficulty: "Medium",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/task-scheduler/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Design Twitter",
        difficulty: "Medium",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/design-twitter/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/find-median-from-data-stream/",
        sheets: ["Blind 75", "NeetCode 150", "Striver SDE Sheet"]
    },
    {
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/top-k-frequent-elements/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Top K Frequent Words",
        difficulty: "Medium",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/top-k-frequent-words/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Kth Largest Element in Stream",
        difficulty: "Easy",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Reorganize String",
        difficulty: "Medium",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/reorganize-string/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/merge-k-sorted-lists/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "IPO",
        difficulty: "Hard",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/ipo/",
        sheets: ["NeetCode 150"]
    },
    {
        title: "Meeting Rooms II",
        difficulty: "Medium",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/meeting-rooms-ii/",
        sheets: ["Blind 75", "NeetCode 150"]
    },
    {
        title: "Smallest Range Covering Elements",
        difficulty: "Hard",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/",
        sheets: ["Striver SDE Sheet"]
    },
    {
        title: "Minimum Cost to Connect Sticks",
        difficulty: "Medium",
        topic: "Heap",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/",
        sheets: ["Striver SDE Sheet"]
    }
];

const seedProblems = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        await Problem.deleteMany();
        console.log("Existing problems cleared");

        await Problem.insertMany(problems);
        console.log(`Seeded ${problems.length} problems successfully`);

        // Print topic summary
        const topics = [...new Set(problems.map(p => p.topic))];
        topics.forEach(topic => {
            const count = problems.filter(
                p => p.topic === topic
            ).length;
            console.log(`  ${topic}: ${count} problems`);
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedProblems();