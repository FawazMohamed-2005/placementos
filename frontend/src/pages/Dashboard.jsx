import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [dsaStats, setDsaStats] = useState(null);
    const [jobStats, setJobStats] = useState(null);
    const [resumeStats, setResumeStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/"); return; }
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };

            const [dsaRes, jobRes, resumeRes] = await Promise.all([
                api.get("/progress/stats", { headers }),
                api.get("/applications/stats/summary", { headers }),
                api.get("/resumes", { headers })
            ]);

            setDsaStats(dsaRes.data);
            setJobStats(jobRes.data);

            const resumes = resumeRes.data;
            setResumeStats({
                total: resumes.length,
                latest: resumes.length > 0 ? resumes[0] : null
            });

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    if (loading) {
        return (
            <div className="page">
                <Navbar />
                <div className="container">
                    <p className="loading-text">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const dsaCompletion = dsaStats
        ? Math.round((dsaStats.solved / (dsaStats.totalTracked || 1)) * 100)
        : 0;

    return (
        <div className="page">
            <Navbar />
            <div className="container">

                {/* Hero */}
                <div className="dash-hero">
                    <div className="dash-hero-left">
                        <h1>{getGreeting()}</h1>
                        <p>Here is your placement preparation summary.</p>
                    </div>
                    <div className="dash-quick-actions">
                        <button
                            className="quick-btn"
                            onClick={() => navigate("/problems")}
                        >
                            + Solve Problem
                        </button>
                        <button
                            className="quick-btn quick-btn-outline"
                            onClick={() => navigate("/jobs/new")}
                        >
                            + Add Application
                        </button>
                    </div>
                </div>

                {/* Overview Strip */}
                <div className="overview-strip">
                    <div className="overview-item">
                        <span className="overview-num solved">
                            {dsaStats?.solved || 0}
                        </span>
                        <span className="overview-label">
                            Problems Solved
                        </span>
                    </div>
                    <div className="overview-divider" />
                    <div className="overview-item">
                        <span className="overview-num attempted">
                            {jobStats?.total || 0}
                        </span>
                        <span className="overview-label">
                            Jobs Applied
                        </span>
                    </div>
                    <div className="overview-divider" />
                    <div className="overview-item">
                        <span className="overview-num total">
                            {jobStats?.offers || 0}
                        </span>
                        <span className="overview-label">
                            Offers
                        </span>
                    </div>
                    <div className="overview-divider" />
                    <div className="overview-item">
                        <span className="overview-num revision">
                            {dsaStats?.revisionNeeded || 0}
                        </span>
                        <span className="overview-label">
                            Need Revision
                        </span>
                    </div>
                </div>

                {/* DSA Section */}
                <div className="dash-section">
                    <div className="dash-section-header">
                        <div className="section-title-group">
                            <h2>DSA Progress</h2>
                        </div>
                        <button
                            className="dash-link"
                            onClick={() => navigate("/problems")}
                        >
                            View Problems →
                        </button>
                    </div>

                    <div className="stats">
                        <div className="stat-card">
                            <p>Solved</p>
                            <h2 className="solved">
                                {dsaStats?.solved || 0}
                            </h2>
                        </div>
                        <div className="stat-card">
                            <p>Attempted</p>
                            <h2 className="attempted">
                                {dsaStats?.attempted || 0}
                            </h2>
                        </div>
                        <div className="stat-card">
                            <p>Revision</p>
                            <h2 className="revision">
                                {dsaStats?.revisionNeeded || 0}
                            </h2>
                        </div>
                        <div className="stat-card">
                            <p>Total Tracked</p>
                            <h2 className="total">
                                {dsaStats?.totalTracked || 0}
                            </h2>
                        </div>
                    </div>

                    <div className="progress-section">
                        <div className="progress-header">
                            <span>DSA Completion</span>
                            <span>{dsaCompletion}%</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${dsaCompletion}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Jobs Section */}
                <div className="dash-section">
                    <div className="dash-section-header">
                        <div className="section-title-group">
                            <h2>Job Applications</h2>
                        </div>
                        <button
                            className="dash-link"
                            onClick={() => navigate("/jobs")}
                        >
                            View Applications →
                        </button>
                    </div>

                    <div className="stats">
                        <div className="stat-card">
                            <p>Total Applied</p>
                            <h2 className="total">
                                {jobStats?.total || 0}
                            </h2>
                        </div>
                        <div className="stat-card">
                            <p>Interviewing</p>
                            <h2 className="solved">
                                {jobStats?.interviewing || 0}
                            </h2>
                        </div>
                        <div className="stat-card">
                            <p>Offers</p>
                            <h2 className="attempted">
                                {jobStats?.offers || 0}
                            </h2>
                        </div>
                        <div className="stat-card">
                            <p>Rejected</p>
                            <h2 className="revision">
                                {jobStats?.rejected || 0}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Resume Section */}
                <div className="dash-section">
                    <div className="dash-section-header">
                        <div className="section-title-group">
                            <h2>Resume Manager</h2>
                        </div>
                        <button
                            className="dash-link"
                            onClick={() => navigate("/resume")}
                        >
                            Manage Resumes →
                        </button>
                    </div>

                    {resumeStats?.total === 0 ? (
                        <div className="dash-empty">
                            <p>No resumes uploaded yet.</p>
                            <button
                                className="quick-btn"
                                onClick={() => navigate("/resume")}
                            >
                                + Upload Resume
                            </button>
                        </div>
                    ) : (
                        <div className="resume-dash-row">
                            <div className="stat-card">
                                <p>Total Resumes</p>
                                <h2 className="total">
                                    {resumeStats?.total || 0}
                                </h2>
                            </div>

                            {resumeStats?.latest && (
                                <div className="latest-resume-card">
                                    <div className="latest-resume-left">
                                        <div>
                                            <p className="latest-label">
                                                Latest Resume
                                            </p>
                                            <p className="latest-title">
                                                {resumeStats.latest.title}
                                            </p>
                                            <p className="latest-date">
                                                Uploaded{" "}
                                                {new Date(
                                                    resumeStats.latest.createdAt
                                                ).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="resume-dash-tags">
                                        {resumeStats.latest.tags?.map(tag => (
                                            <span
                                                key={tag}
                                                className="resume-tag"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Interview Prep Section */}
                <div className="dash-section">
                    <div className="dash-section-header">
                        <div className="section-title-group">
                            <h2>Interview Preparation</h2>
                        </div>
                        <button
                            className="dash-link"
                            onClick={() => navigate("/interview")}
                        >
                            View Prep →
                        </button>
                    </div>
                    <div className="dash-empty">
                        <p>
                            Save your HR answers, behavioral responses and more.
                        </p>
                        <button
                            className="quick-btn"
                            onClick={() => navigate("/interview")}
                        >
                            Start Preparing
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;