import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./JobForm.css";

const STATUSES = [
    "Applied",
    "OA Scheduled",
    "OA Completed",
    "Interview Scheduled",
    "Rejected",
    "Offer Received"
];

const JobForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // If id exists in URL, we are editing. Otherwise adding.
    const isEditing = Boolean(id);

    const [form, setForm] = useState({
        company: "",
        role: "",
        location: "",
        applicationDate: new Date().toISOString().split("T")[0],
        status: "Applied",
        jobLink: "",
        notes: ""
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditing);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/"); return; }

        // If editing, fetch existing data
        if (isEditing) {
            fetchApplication();
        }
    }, []);

    const fetchApplication = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get(`/applications/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const app = res.data;

            setForm({
                company: app.company || "",
                role: app.role || "",
                location: app.location || "",
                applicationDate: app.applicationDate
                    ? new Date(app.applicationDate)
                        .toISOString()
                        .split("T")[0]
                    : new Date().toISOString().split("T")[0],
                status: app.status || "Applied",
                jobLink: app.jobLink || "",
                notes: app.notes || ""
            });

            setFetching(false);
        } catch (err) {
            console.log(err);
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.company.trim() || !form.role.trim()) {
            alert("Company and Role are required.");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (isEditing) {
                await api.put(`/applications/${id}`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await api.post("/applications", form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            navigate("/jobs");
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="page">
            <Navbar />
            <div className="container">
                <p className="loading-text">Loading...</p>
            </div>
        </div>
    );

    return (
        <div className="page">
            <Navbar />
            <div className="container">

                <button
                    className="back-btn"
                    onClick={() => navigate("/jobs")}
                >
                    ← Back to Jobs
                </button>

                <div className="form-card">
                    <h1 className="form-title">
                        {isEditing ? "Edit Application" : "Add Application"}
                    </h1>

                    <div className="form-grid">

                        <div className="form-field">
                            <label htmlFor="company">Company *</label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                placeholder="e.g. Google"
                                value={form.company}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="role">Role *</label>
                            <input
                                id="role"
                                name="role"
                                type="text"
                                placeholder="e.g. SDE-1"
                                value={form.role}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="location">Location</label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                placeholder="e.g. Bangalore / Remote"
                                value={form.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="applicationDate">
                                Application Date
                            </label>
                            <input
                                id="applicationDate"
                                name="applicationDate"
                                type="date"
                                value={form.applicationDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                {STATUSES.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="jobLink">Job Link</label>
                            <input
                                id="jobLink"
                                name="jobLink"
                                type="text"
                                placeholder="Paste JD URL here"
                                value={form.jobLink}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-field form-field-full">
                            <label htmlFor="notes">Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                placeholder="Any notes about this application..."
                                value={form.notes}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>

                    </div>

                    <div className="form-actions">
                        <button
                            className="btn-cancel"
                            onClick={() => navigate("/jobs")}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn-submit"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : isEditing
                                ? "Update Application"
                                : "Add Application"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobForm;