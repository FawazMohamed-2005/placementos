import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Jobs.css";

const STATUS_COLORS = {
    "Applied": "status-applied",
    "OA Scheduled": "status-oa",
    "OA Completed": "status-oa",
    "Interview Scheduled": "status-interview",
    "Rejected": "status-rejected",
    "Offer Received": "status-offer"
};

const Jobs = () => {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/"); return; }
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/applications", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplications(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const deleteApplication = async (id) => {
        if (!window.confirm("Delete this application?")) return;
        try {
            const token = localStorage.getItem("token");
            await api.delete(`/applications/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplications(prev =>
                prev.filter(a => a._id !== id)
            );
        } catch (err) {
            console.log(err);
        }
    };

    // Stats
    const total = applications.length;
    const offers = applications.filter(
        a => a.status === "Offer Received"
    ).length;
    const interviewing = applications.filter(
        a => a.status === "Interview Scheduled"
    ).length;
    const rejected = applications.filter(
        a => a.status === "Rejected"
    ).length;

    // Filter + Search
    const filtered = applications.filter(app => {
        const matchStatus =
            filter === "All" || app.status === filter;
        const matchSearch =
            app.company.toLowerCase().includes(search.toLowerCase()) ||
            app.role.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <div className="page">
            <Navbar />
            <div className="container">

                {/* Hero */}
                <div className="jobs-hero">
                    <div>
                        <h1>Job Tracker</h1>
                        <p>Track every application. Miss nothing.</p>
                    </div>
                    <Link to="/jobs/new" className="btn-add-job">
                        + Add Application
                    </Link>
                </div>

                {/* Stats */}
                <div className="stats">
                    <div className="stat-card">
                        <p>Total</p>
                        <h2 className="total">{total}</h2>
                    </div>
                    <div className="stat-card">
                        <p>Interviewing</p>
                        <h2 className="solved">{interviewing}</h2>
                    </div>
                    <div className="stat-card">
                        <p>Offers</p>
                        <h2 className="attempted">{offers}</h2>
                    </div>
                    <div className="stat-card">
                        <p>Rejected</p>
                        <h2 className="revision">{rejected}</h2>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search company or role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-box"
                    />

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="All">All Status</option>
                        <option value="Applied">Applied</option>
                        <option value="OA Scheduled">OA Scheduled</option>
                        <option value="OA Completed">OA Completed</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offer Received">Offer Received</option>
                    </select>
                </div>

                {/* Applications List */}
                {loading && (
                    <p className="loading-text">Loading applications...</p>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="empty">
                        <p>No applications found.</p>
                        <Link to="/jobs/new" className="btn-add-job">
                            + Add Your First Application
                        </Link>
                    </div>
                )}

                <div className="jobs-list">
                    {filtered.map((app) => (
                        <div key={app._id} className="job-card">

                            <div className="job-card-left">
                                <div className="job-title-row">
                                    <h2>{app.company}</h2>
                                    <span className={`job-status ${STATUS_COLORS[app.status]}`}>
                                        {app.status}
                                    </span>
                                </div>

                                <p className="job-role">{app.role}</p>

                                <div className="job-meta">
                                    {app.location && (
                                        <span className="meta-pill">
                                             {app.location}
                                        </span>
                                    )}
                                    <span className="meta-pill">
                                        {formatDate(app.applicationDate)}
                                    </span>
                                </div>

                                {app.notes && (
                                    <p className="job-notes">{app.notes}</p>
                                )}
                            </div>

                            <div className="job-card-actions">
                                {app.jobLink && (
                                    <a
                                        href={app.jobLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-link"
                                    >
                                        JD →
                                    </a>
                                )}

                                <Link
                                    to={`/jobs/${app._id}/edit`}
                                    className="btn-edit"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="btn-delete"
                                    onClick={() => deleteApplication(app._id)}
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Jobs;