import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => navigate("/dashboard")}
      >
        PlacementOS
      </div>

      <div className="nav-links">
        <button
          className={`nav-btn ${
            location.pathname === "/dashboard"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`nav-btn ${
            location.pathname === "/problems"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/problems")}
        >
          Problems
        </button>

        <button
          className="nav-btn logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;