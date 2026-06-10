import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./ProblemDetail.css";

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aiDoubt, setAiDoubt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [problem, setProblem] = useState(null);
  const [status, setStatus] = useState("Not Started");
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState({
    approach: "",
    mistakes: "",
    timeComplexity: "",
    spaceComplexity: "",
    revisionNotes: ""
  });
  const [notesSaved, setNotesSaved] = useState(false);
  const [notesSaving, setNotesSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }
    fetchProblem();
    fetchStatus();
    fetchNotes();
  }, []);

  const fetchProblem = async () => {
    try {
      const res = await api.get(`/problems/${id}`);
      setProblem(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/progress", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const found = res.data.find((p) => p.problem?._id === id);
      if (found) setStatus(found.status);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/progress",
        { problemId: id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus(newStatus);
    } catch (err) {
      console.log(err);
    }
  };

  const saveNotes = async () => {
    try {
      setNotesSaving(true);
      const token = localStorage.getItem("token");
      await api.post(`/notes/${id}`, notes, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotesSaved(true);
      setNotesSaving(false);
      setTimeout(() => setNotesSaved(false), 2000);
    } catch (err) {
      console.log(err);
      setNotesSaving(false);
    }
  };

  const getDifficultyClass = (diff) => {
    if (diff === "Easy") return "tag tag-easy";
    if (diff === "Medium") return "tag tag-medium";
    return "tag tag-hard";
  };

  const getStatusClass = (s) => {
    if (s === "Solved") return "tag tag-solved";
    if (s === "Attempted") return "tag tag-attempted";
    if (s === "Revision Needed") return "tag tag-revision";
    return "tag tag-ns";
  };

  if (loading) return (
    <div className="page">
      <Navbar />
      <div className="container">
        <p className="loading-text">Loading problem...</p>
      </div>
    </div>
  );

  if (!problem) return (
    <div className="page">
      <Navbar />
      <div className="container">
        <p className="loading-text">Problem not found.</p>
      </div>
    </div>
  );
  const askAiMentor = async () => {
    if (!aiDoubt.trim()) return;
    try {
        setAiLoading(true);
        setAiResponse("");
        const token = localStorage.getItem("token");
        const res = await api.post(
            "/ai/dsa-mentor",
            {
                problemTitle: problem.title,
                topic: problem.topic,
                difficulty: problem.difficulty,
                doubt: aiDoubt
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setAiResponse(res.data.response);
        setAiLoading(false);
    } catch (err) {
        console.log(err);
        setAiResponse(
            "AI service unavailable. Please try again."
        );
        setAiLoading(false);
    }
};
  return (
    <div className="page">
      <Navbar />
      <div className="container">

        <button
          className="back-btn"
          onClick={() => navigate("/problems")}
        >
          ← Back to Problems
        </button>

        <div className="detail-card">
          {/* AI DSA Mentor */}
          <div className="ai-section">
              <div className="ai-section-header">
                  <p className="meta-label">AI DSA Mentor</p>
                  <span className="ai-badge">
                      Powered by GROQ AI
                  </span>
              </div>

              <p className="ai-description">
                  Stuck on this problem? Ask the AI mentor
                  for hints. It will not give you the
                  full solution.
              </p>

              <div className="ai-input-row">
                  <input
                      id="aiDoubt"
                      name="aiDoubt"
                      type="text"
                      placeholder="e.g. What approach should I use?"
                      value={aiDoubt}
                      onChange={(e) => setAiDoubt(e.target.value)}
                      className="ai-input"
                      onKeyDown={(e) => {
                          if (e.key === "Enter") askAiMentor();
                      }}
                  />
                  <button
                      className="btn-ask-ai"
                      onClick={askAiMentor}
                      disabled={aiLoading || !aiDoubt.trim()}
                  >
                      {aiLoading ? "Thinking..." : "Ask AI"}
                  </button>
              </div>

              {aiResponse && (
                  <div className="ai-response">
                      <p className="ai-response-label">
                          AI Mentor Response
                      </p>
                      <div className="ai-response-text">
                          {aiResponse.split("\n").map((line, i) => (
                              <p key={i}>{line}</p>
                          ))}
                      </div>
                  </div>
              )}
          </div>
          {/* Header */}
          <div className="detail-header">
            <h1>{problem.title}</h1>
            <span className={getStatusClass(status)}>{status}</span>
          </div>

          {/* Meta Grid */}
          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Difficulty</span>
              <span className={getDifficultyClass(problem.difficulty)}>
                {problem.difficulty}
              </span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Topic</span>
              <span className="tag tag-topic">{problem.topic}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Platform</span>
              <span className="tag tag-plat">{problem.platform}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">Included In</span>
              <div className="sheets-pills">
                {problem.sheets?.map((sheet) => (
                  <span key={sheet} className="sheet-pill">{sheet}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Status Buttons */}
          <div className="detail-status-section">
            <p className="meta-label">Update Status</p>
            <div className="status-buttons">
              <button
                className={`btn-status btn-attempted ${
                  status === "Attempted" ? "active" : ""
                }`}
                onClick={() => updateStatus("Attempted")}
              >
                ~ Attempted
              </button>
              <button
                className={`btn-status btn-solve ${
                  status === "Solved" ? "active" : ""
                }`}
                onClick={() => updateStatus("Solved")}
              >
                ✓ Solved
              </button>
              <button
                className={`btn-status btn-revision ${
                  status === "Revision Needed" ? "active" : ""
                }`}
                onClick={() => updateStatus("Revision Needed")}
              >
                ↺ Revision
              </button>
            </div>
          </div>

          {/* Problem Link */}
          <div className="detail-link-section">
            <a 
              href={problem.link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-link"
            >
              Open Problem →
            </a>
          </div>

          {/* Notes Section */}
          <div className="notes-section">
            <div className="notes-header">
              <p className="meta-label">My Notes</p>
              <button
                className="save-notes-btn"
                onClick={saveNotes}
                disabled={notesSaving}
              >
                {notesSaving
                  ? "Saving..."
                  : notesSaved
                  ? "✓ Saved!"
                  : "Save Notes"}
              </button>
            </div>

            <div className="notes-grid">

              <div className="note-field">
                <label htmlFor="approach">My Approach</label>
                <textarea
                  id="approach"
                  name="approach"
                  placeholder="How did you approach this problem?"
                  value={notes.approach}
                  onChange={(e) =>
                    setNotes({ ...notes, approach: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="note-field">
                <label htmlFor="mistakes">Mistakes Made</label>
                <textarea
                  id="mistakes"
                  name="mistakes"
                  placeholder="What mistakes did you make?"
                  value={notes.mistakes}
                  onChange={(e) =>
                    setNotes({ ...notes, mistakes: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="note-field note-field-half">
                <label htmlFor="timeComplexity">Time Complexity</label>
                <input
                  id="timeComplexity"
                  name="timeComplexity"
                  type="text"
                  placeholder="e.g. O(n log n)"
                  value={notes.timeComplexity}
                  onChange={(e) =>
                    setNotes({ ...notes, timeComplexity: e.target.value })
                  }
                />
              </div>

              <div className="note-field note-field-half">
                <label htmlFor="spaceComplexity">Space Complexity</label>
                <input
                  id="spaceComplexity"
                  name="spaceComplexity"
                  type="text"
                  placeholder="e.g. O(n)"
                  value={notes.spaceComplexity}
                  onChange={(e) =>
                    setNotes({ ...notes, spaceComplexity: e.target.value })
                  }
                />
              </div>

              <div className="note-field note-field-full">
                <label htmlFor="revisionNotes">Revision Notes</label>
                <textarea
                  id="revisionNotes"
                  name="revisionNotes"
                  placeholder="Key points to remember during revision..."
                  value={notes.revisionNotes}
                  onChange={(e) =>
                    setNotes({ ...notes, revisionNotes: e.target.value })
                  }
                  rows={3}
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;