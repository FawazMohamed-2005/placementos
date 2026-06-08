import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Resume.css";

const Resume = () => {
    const navigate = useNavigate();

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const fileInputRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/"); return; }
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/resumes", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResumes(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        setError("");

        if (!title.trim()) {
            setError("Please enter a title.");
            return;
        }
        if (!file) {
            setError("Please select a PDF file.");
            return;
        }
        if (file.type !== "application/pdf") {
            setError("Only PDF files are allowed.");
            return;
        }

        try {
            setUploading(true);
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("title", title.trim());
            formData.append("tags", tags.trim());
            formData.append("resume", file);

            await api.post("/resumes", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTitle("");
            setTags("");
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setShowForm(false);
            setUploading(false);
            fetchResumes();
        } catch (err) {
            console.log(err);
            setError("Upload failed. Please try again.");
            setUploading(false);
        }
    };

    const deleteResume = async (id) => {
        if (!window.confirm("Delete this resume?")) return;
        try {
            const token = localStorage.getItem("token");
            await api.delete(`/resumes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResumes(prev => prev.filter(r => r._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const formatSize = (bytes) => {
        if (!bytes) return "—";
        const kb = bytes / 1024;
        if (kb < 1024) return `${Math.round(kb)} KB`;
        return `${(kb / 1024).toFixed(1)} MB`;
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const getFileUrl = (filename) => {
        return `http://localhost:5000/uploads/${filename}`;
    };

    return (
        <div className="page">
            <Navbar />
            <div className="container">

                <div className="jobs-hero">
                    <div>
                        <h1>Resume Manager</h1>
                        <p>Manage all your resume versions in one place.</p>
                    </div>
                    <button
                        className="btn-add-job"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "✕ Cancel" : "+ Upload Resume"}
                    </button>
                </div>

                {showForm && (
                    <div className="resume-form-card">
                        <h2 className="form-title">Upload New Resume</h2>

                        {error && (
                            <div className="upload-error">{error}</div>
                        )}

                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="resumeTitle">Title *</label>
                                <input
                                    id="resumeTitle"
                                    name="resumeTitle"
                                    type="text"
                                    placeholder="e.g. Resume v1, SDE Resume"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="resumeTags">
                                    Tags (comma separated)
                                </label>
                                <input
                                    id="resumeTags"
                                    name="resumeTags"
                                    type="text"
                                    placeholder="e.g. SDE, Product, General"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                            </div>

                            <div className="form-field form-field-full">
                                <label htmlFor="resumeFile">
                                    PDF File * (max 5MB)
                                </label>
                                <input
                                    id="resumeFile"
                                    name="resumeFile"
                                    type="file"
                                    accept=".pdf"
                                    ref={fileInputRef}
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="file-input"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                className="btn-cancel"
                                onClick={() => {
                                    setShowForm(false);
                                    setError("");
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-submit"
                                onClick={handleUpload}
                                disabled={uploading}
                            >
                                {uploading ? "Uploading..." : "Upload Resume"}
                            </button>
                        </div>
                    </div>
                )}

                {loading && (
                    <p className="loading-text">Loading resumes...</p>
                )}

                {!loading && resumes.length === 0 && !showForm && (
                    <div className="empty">
                        <p>No resumes uploaded yet.</p>
                        <button
                            className="btn-add-job"
                            onClick={() => setShowForm(true)}
                        >
                            + Upload Your First Resume
                        </button>
                    </div>
                )}

                <div className="resume-list">
                    {resumes.map((resume) => (
                        <div key={resume._id} className="resume-card">
                            <div className="resume-icon">📄</div>

                            <div className="resume-info">
                                <h3>{resume.title}</h3>
                                <p className="resume-original">
                                    {resume.originalName}
                                </p>

                                <div className="resume-meta-row">
                                    <span className="meta-pill">
                                        {formatSize(resume.fileSize)}
                                    </span>
                                    <span className="meta-pill">
                                        {formatDate(resume.createdAt)}
                                    </span>
                                </div>

                                {resume.tags?.length > 0 && (
                                    <div className="resume-tags">
                                        {resume.tags.map((tag) => (
                                            <span key={tag} className="resume-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="resume-actions">
                                <a
                                    href={getFileUrl(resume.filename)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-view-resume"
                                >
                                    View PDF
                                </a>
                                <a
                                    href={getFileUrl(resume.filename)}
                                    download={resume.originalName}
                                    className="btn-edit"
                                >
                                    Download
                                </a>
                                <button
                                    className="btn-delete"
                                    onClick={() => deleteResume(resume._id)}
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

export default Resume;