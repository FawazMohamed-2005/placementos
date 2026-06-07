import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [dsaStats, setDsaStats] = useState(null);
    const [jobStats, setJobStats] = useState(null);
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

            const [dsaRes, jobRes] = await Promise.all([
                api.get("/progress/stats", { headers }),
                api.get("/applications/stats/summary", { headers })
            ]);

            setDsaStats(dsaRes.data);
            setJobStats(jobRes.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
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
                    <h1>Welcome back </h1>
                    <p>Here is your placement preparation summary.</p>
                </div>

                {/* DSA Section */}
                <div className="dash-section">
                    <div className="dash-section-header">
                        <h2>DSA Progress</h2>
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

                    {/* DSA Progress Bar */}
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
                        <h2>Job Applications</h2>
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

            </div>
        </div>
    );
}

export default Dashboard;