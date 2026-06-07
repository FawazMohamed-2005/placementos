import { useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Problems.css";

const Problems = () => {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [progress, setProgress] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchProblems();
    fetchProgress();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await api.get("/problems");
      setProblems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/progress", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProgress(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Generic status updater — replaces markSolved
  const updateStatus = async (problemId, status) => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/progress",
        { problemId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProgress();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatus = (problemId) => {
    const found = progress.find((p) => p.problem?._id === problemId);
    return found ? found.status : "Not Started";
  };

  // ── Stats ──────────────────────────────────────────
  const solvedCount = progress.filter((p) => p.status === "Solved").length;
  const attemptedCount = progress.filter((p) => p.status === "Attempted").length;
  const revisionCount = progress.filter((p) => p.status === "Revision Needed").length;

  const completion =
    problems.length > 0
      ? Math.round((solvedCount / problems.length) * 100)
      : 0;

  // ── Filters ────────────────────────────────────────
  const topics = ["All", ...new Set(problems.map((p) => p.topic))];

  const getDifficultyClass = (diff) => {
    if (diff === "Easy") return "tag tag-easy";
    if (diff === "Medium") return "tag tag-medium";
    return "tag tag-hard";
  };

  // Returns the CSS class for the status badge
  const getStatusClass = (status) => {
    if (status === "Solved") return "tag tag-solved";
    if (status === "Attempted") return "tag tag-attempted";
    if (status === "Revision Needed") return "tag tag-revision";
    return "tag tag-ns"; // Not Started
  };

  const filteredProblems = problems.filter((problem) => {
    const matchSearch = problem.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchDifficulty =
      difficulty === "All" || problem.difficulty === difficulty;
    const matchTopic = topic === "All" || problem.topic === topic;
    return matchSearch && matchDifficulty && matchTopic;
  });

  return (
    <div className="page">
      <Navbar />

      <div className="container">
        {/* Hero */}
        <div className="hero">
          <h1>DSA Tracker</h1>
          <p>Track every problem. Know exactly where you stand.</p>
        </div>

        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="filter-select"
          >
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Stats — now shows 5 cards */}
        <div className="stats">
          <div className="stat-card">
            <p>Total</p>
            <h2 className="total">{problems.length}</h2>
          </div>

          <div className="stat-card">
            <p>Solved</p>
            <h2 className="solved">{solvedCount}</h2>
          </div>

          <div className="stat-card">
            <p>Attempted</p>
            <h2 className="attempted">{attemptedCount}</h2>
          </div>

          <div className="stat-card">
            <p>Revision</p>
            <h2 className="revision">{revisionCount}</h2>
          </div>

          <div className="stat-card">
            <p>Remaining</p>
            <h2 className="remain">
              {problems.length - solvedCount}
            </h2>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-header">
            <span>Overall Progress</span>
            <span>{completion}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="problems-grid">
          {filteredProblems.map((problem) => {
            const status = getStatus(problem._id);

            return (
              <div key={problem._id} className="problem-card">
                {/* Card Top: Title + Tags */}
                <div>
                  <Link to={`/problems/${problem._id}`} className="problem-title-link">
                    <h2>{problem.title}</h2>
                  </Link>

                  <div className="tags">
                    <span className={getDifficultyClass(problem.difficulty)}>
                      {problem.difficulty}
                    </span>

                    <span className="tag tag-topic">{problem.topic}</span>

                    <span className="tag tag-plat">{problem.platform}</span>

                    {/* Status Badge — updates dynamically */}
                    <span className={getStatusClass(status)}>
                      {status}
                    </span>
                  </div>

                  <div className="sheets-box">
                    <p className="sheets-label">Included In</p>
                    <div className="sheets-pills">
                      {problem.sheets?.map((sheet) => (
                        <span key={sheet} className="sheet-pill">
                          {sheet}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom: 3 Status Buttons + Link */}
                <div className="actions">
                  <div className="status-buttons">
                    <button
                      className={`btn-status btn-attempted ${
                        status === "Attempted" ? "active" : ""
                      }`}
                      onClick={() => updateStatus(problem._id, "Attempted")}
                    >
                      ~ Attempted
                    </button>

                    <button
                      className={`btn-status btn-solve ${
                        status === "Solved" ? "active" : ""
                      }`}
                      onClick={() => updateStatus(problem._id, "Solved")}
                    >
                      ✓ Solved
                    </button>

                    <button
                      className={`btn-status btn-revision ${
                        status === "Revision Needed" ? "active" : ""
                      }`}
                      onClick={() =>
                        updateStatus(problem._id, "Revision Needed")
                      }
                    >
                      ↺ Revision
                    </button>
                  </div>

                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-link"
                  >
                    Solve →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProblems.length === 0 && (
          <div className="empty">
            <p>No matching problems found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problems;