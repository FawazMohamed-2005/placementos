import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Interview.css";

const CATEGORIES = [
    "Introduction",
    "Strengths & Weaknesses",
    "Behavioral",
    "Projects",
    "Company Specific",
    "Other"
];

const SUGGESTED_QUESTIONS = {
    "Introduction": [
        "Tell me about yourself",
        "Walk me through your resume",
        "Where do you see yourself in 5 years?"
    ],
    "Strengths & Weaknesses": [
        "What are your greatest strengths?",
        "What is your biggest weakness?",
        "What makes you stand out?"
    ],
    "Behavioral": [
        "Tell me about a challenge you faced",
        "Describe a time you worked in a team",
        "Tell me about a time you failed"
    ],
    "Projects": [
        "Tell me about your best project",
        "What was the most difficult technical problem you solved?",
        "Explain your final year project"
    ],
    "Company Specific": [
        "Why do you want to join our company?",
        "What do you know about our products?",
        "Why should we hire you?"
    ],
    "Other": []
};


const emptyForm = {
    category: "Introduction",
    question: "",
    answer: "",
    notes: ""
};

const Interview = () => {
    const navigate = useNavigate();
    const [coachQuestion, setCoachQuestion] = useState(null);
    const [coachAnswer, setCoachAnswer] = useState("");
    const [coachResponse, setCoachResponse] = useState("");
    const [coachLoading, setCoachLoading] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedId, setExpandedId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/"); return; }
        fetchAnswers();
    }, []);

    const fetchAnswers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get("/interview", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnswers(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setError("");

        if (!form.question.trim()) {
            setError("Please enter a question.");
            return;
        }
        if (!form.answer.trim()) {
            setError("Please enter your answer.");
            return;
        }

        try {
            setSaving(true);
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };

            if (editingId) {
                await api.put(
                    `/interview/${editingId}`,
                    form,
                    { headers }
                );
            } else {
                await api.post("/interview", form, { headers });
            }

            setForm(emptyForm);
            setShowForm(false);
            setEditingId(null);
            setSaving(false);
            fetchAnswers();
        } catch (err) {
            console.log(err);
            setError("Failed to save. Please try again.");
            setSaving(false);
        }
    };

    const handleEdit = (item) => {
        setForm({
            category: item.category,
            question: item.question,
            answer: item.answer,
            notes: item.notes || ""
        });
        setEditingId(item._id);
        setShowForm(true);
        setError("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this answer?")) return;
        try {
            const token = localStorage.getItem("token");
            await api.delete(`/interview/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnswers(prev => prev.filter(a => a._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        setForm(emptyForm);
        setShowForm(false);
        setEditingId(null);
        setError("");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const useSuggestedQuestion = (q) => {
        setForm({ ...form, question: q });
    };

    const filtered = activeCategory === "All"
        ? answers
        : answers.filter(a => a.category === activeCategory);

    const grouped = CATEGORIES.reduce((acc, cat) => {
        const items = filtered.filter(a => a.category === cat);
        if (items.length > 0) acc[cat] = items;
        return acc;
    }, {});
    const askInterviewCoach = async (item) => {
    if (!coachAnswer.trim()) return;
    try {
        setCoachLoading(true);
        setCoachResponse("");
        const token = localStorage.getItem("token");
        const res = await api.post(
            "/ai/interview-coach",
            {
                question: item.question,
                answer: coachAnswer,
                category: item.category
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setCoachResponse(res.data.response);
        setCoachLoading(false);
    } catch (err) {
        console.log(err);
        setCoachResponse(
            "AI service unavailable. Please try again."
        );
        setCoachLoading(false);
    }
    };
    return (
        <div className="page">
            <Navbar />
            <div className="container">

                {/* Hero */}
                <div className="jobs-hero">
                    <div>
                        <h1>Interview Prep</h1>
                        <p>Save your answers. Review before every interview.</p>
                    </div>
                    <button
                        className="btn-add-job"
                        onClick={() => {
                            setShowForm(!showForm);
                            if (showForm) handleCancel();
                        }}
                    >
                        {showForm ? "Cancel" : "+ Add Answer"}
                    </button>
                </div>

                {/* Add / Edit Form */}
                {showForm && (
                    <div className="interview-form-card">
                        <h2 className="form-title">
                            {editingId ? "Edit Answer" : "Add New Answer"}
                        </h2>

                        {error && (
                            <div className="upload-error">{error}</div>
                        )}

                        <div className="form-grid">

                            <div className="form-field">
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                >
                                    {CATEGORIES.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-field form-field-full">
                                <label htmlFor="question">Question</label>
                                <input
                                    id="question"
                                    name="question"
                                    type="text"
                                    placeholder="e.g. Tell me about yourself"
                                    value={form.question}
                                    onChange={handleChange}
                                />

                                {SUGGESTED_QUESTIONS[form.category]?.length > 0 && (
                                    <div className="suggestions">
                                        <p className="suggestions-label">
                                            Suggestions:
                                        </p>
                                        <div className="suggestions-list">
                                            {SUGGESTED_QUESTIONS[form.category].map(q => (
                                                <button
                                                    key={q}
                                                    className="suggestion-pill"
                                                    onClick={() =>
                                                        useSuggestedQuestion(q)
                                                    }
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-field form-field-full">
                                <label htmlFor="answer">Your Answer</label>
                                <textarea
                                    id="answer"
                                    name="answer"
                                    placeholder="Write your prepared answer here..."
                                    value={form.answer}
                                    onChange={handleChange}
                                    rows={5}
                                />
                            </div>

                            <div className="form-field form-field-full">
                                <label htmlFor="notes">
                                    Notes (optional)
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    placeholder="e.g. Use STAR format, mention project X..."
                                    value={form.notes}
                                    onChange={handleChange}
                                    rows={2}
                                />
                            </div>

                        </div>

                        <div className="form-actions">
                            <button
                                className="btn-cancel"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-submit"
                                onClick={handleSubmit}
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId
                                    ? "Update Answer"
                                    : "Save Answer"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Category Filter Tabs */}
                <div className="category-tabs">
                    <button
                        className={`cat-tab ${
                            activeCategory === "All" ? "active" : ""
                        }`}
                        onClick={() => setActiveCategory("All")}
                    >
                        All ({answers.length})
                    </button>

                    {CATEGORIES.map(cat => {
                        const count = answers.filter(
                            a => a.category === cat
                        ).length;
                        if (count === 0) return null;
                        return (
                            <button
                                key={cat}
                                className={`cat-tab ${
                                    activeCategory === cat ? "active" : ""
                                }`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat} ({count})
                            </button>
                        );
                    })}
                </div>

                {/* Loading */}
                {loading && (
                    <p className="loading-text">Loading answers...</p>
                )}

                {/* Empty State */}
                {!loading && answers.length === 0 && !showForm && (
                    <div className="empty">
                        <p>No answers saved yet.</p>
                        <button
                            className="btn-add-job"
                            onClick={() => setShowForm(true)}
                        >
                            + Add Your First Answer
                        </button>
                    </div>
                )}

                {/* Answers Grouped by Category */}
                {Object.entries(grouped).map(([cat, items]) => (
                    <div key={cat} className="category-group">

                        <div className="category-group-header">
                            <h3>{cat}</h3>
                            <span className="cat-count">
                                {items.length}
                            </span>
                        </div>

                        <div className="answers-list">
                            {items.map(item => (
                                <div
                                    key={item._id}
                                    className="answer-card"
                                >
                                    <div
                                        className="answer-question-row"
                                        onClick={() =>
                                            setExpandedId(
                                                expandedId === item._id
                                                    ? null
                                                    : item._id
                                            )
                                        }
                                    >
                                        <h4 className="answer-question">
                                            {item.question}
                                        </h4>
                                        <span className="expand-icon">
                                            {expandedId === item._id
                                                ? "▲"
                                                : "▼"}
                                        </span>
                                    </div>

                                    {expandedId === item._id && (
                                        <div className="answer-body">

                                            <div className="answer-section">
                                                <p className="answer-label">
                                                    My Answer
                                                </p>
                                                <p className="answer-text">
                                                    {item.answer}
                                                </p>
                                            </div>

                                            {item.notes && (
                                                <div className="answer-section">
                                                    <p className="answer-label">
                                                        Notes
                                                    </p>
                                                    <p className="answer-notes">
                                                        {item.notes}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="answer-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        handleDelete(item._id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                            <div className="ai-coach-section">
                                                <p className="answer-label">
                                                    Practice with AI Coach
                                                </p>

                                                {coachQuestion?._id !== item._id ? (
                                                    <button
                                                        className="btn-ai-coach"
                                                        onClick={() => {
                                                            setCoachQuestion(item);
                                                            setCoachAnswer("");
                                                            setCoachResponse("");
                                                        }}
                                                    >
                                                        Practice Answer with AI
                                                    </button>
                                                ) : (
                                                    <div className="coach-practice-area">
                                                        <textarea
                                                            id={`coach-${item._id}`}
                                                            name={`coach-${item._id}`}
                                                            placeholder="Type your answer here and get AI feedback..."
                                                            value={coachAnswer}
                                                            onChange={(e) =>
                                                                setCoachAnswer(e.target.value)
                                                            }
                                                            rows={4}
                                                            className="coach-textarea"
                                                        />

                                                        <div className="coach-actions">
                                                            <button
                                                                className="btn-cancel"
                                                                onClick={() => {
                                                                    setCoachQuestion(null);
                                                                    setCoachAnswer("");
                                                                    setCoachResponse("");
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                className="btn-ask-ai"
                                                                onClick={() =>
                                                                    askInterviewCoach(item)
                                                                }
                                                                disabled={
                                                                    coachLoading ||
                                                                    !coachAnswer.trim()
                                                                }
                                                            >
                                                                {coachLoading
                                                                    ? "Evaluating..."
                                                                    : "Get AI Feedback"}
                                                            </button>
                                                        </div>

                                                        {coachResponse && (
                                                            <div className="ai-response">
                                                                <p className="ai-response-label">
                                                                    AI Coach Feedback
                                                                </p>
                                                                <div className="ai-response-text">
                                                                    {coachResponse
                                                                        .split("\n")
                                                                        .map((line, i) => (
                                                                            <p key={i}>{line}</p>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Interview;