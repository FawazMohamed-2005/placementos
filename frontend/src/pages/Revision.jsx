import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Revision.css";

const Revision = () => {
  const navigate = useNavigate();
  const [revisionList, setRevisionList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchRevision();
  }, []);

  const fetchRevision = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/progress/revision", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove any entries where problem is null
      const validData = (res.data || []).filter(
        (item) => item && item.problem
      );

      setRevisionList(validData);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const updateStatus = async (problemId, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/progress",
        { problemId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove instantly from revision queue
      setRevisionList((prev) =>
        prev.filter((p) => p?.problem?._id !== problemId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getDifficultyClass = (diff) => {
    if (diff === "Easy") return "tag tag-easy";
    if (diff === "Medium") return "tag tag-medium";
    return "tag tag-hard";
  };

  return (
    <div className="page">
      <Navbar />

      <div className="container">
        <div className="hero">
          <h1>Revision Queue</h1>
          <p>
            {revisionList.length} problem
            {revisionList.length !== 1 ? "s" : ""} need revision.
          </p>
        </div>

        {loading && <p className="loading-text">Loading...</p>}

        {!loading && revisionList.length === 0 && (
          <div className="empty-revision">
            <p>No problems in revision queue!</p>
            <p>You are fully prepared.</p>
          </div>
        )}

        <div className="revision-list">
          {revisionList.map((item) => {
            if (!item?.problem) return null;

            const problem = item.problem;

            return (
              <div key={problem._id} className="revision-card">
                <div className="revision-left">
                  <h3>{problem.title}</h3>

                  <div className="tags">
                    <span
                      className={getDifficultyClass(problem.difficulty)}
                    >
                      {problem.difficulty}
                    </span>

                    <span className="tag tag-topic">
                      {problem.topic}
                    </span>

                    <span className="tag tag-revision">
                      Revision Needed
                    </span>
                  </div>
                </div>

                <div className="revision-actions">
                  <button
                    className="btn-status btn-solve"
                    onClick={() =>
                      updateStatus(problem._id, "Solved")
                    }
                  >
                    ✓ Mark Solved
                  </button>

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
      </div>
    </div>
  );
};

export default Revision;