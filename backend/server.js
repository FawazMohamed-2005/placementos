const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
dotenv.config();
const resumeRoutes = require("./routes/resumeRoutes");
const progressRoutes = require("./routes/progressRoutes");
connectDB();
const applicationRoutes = require("./routes/applicationRoutes");
const app = express();
app.use("/uploads", express.static("uploads"));
const noteRoutes = require("./routes/noteRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/progress", progressRoutes);
app.get("/", (req, res) => {
    res.send("PlacementOS Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});