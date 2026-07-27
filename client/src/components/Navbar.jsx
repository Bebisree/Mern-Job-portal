import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">

      <div className="nav-left">
        <Link to="/" className="logo">
          💼 Job Portal
        </Link>

        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>

        {token && user?.role === "employer" && (
          <>
            <Link to="/post-job">Post Job</Link>
            <Link to="/employer-dashboard">Employer Dashboard</Link>
          </>
        )}

        {token && user?.role === "candidate" && (
          <Link to="/my-applications">My Applications</Link>
        )}

        {token && user?.role === "admin" && (
          <Link to="/admin-dashboard">Admin Dashboard</Link>
        )}

        {token && <Link to="/profile">Profile</Link>}
      </div>

      <div className="nav-right">
        {token ? (
          <>
            <span className="user-name">👋 {user?.name}</span>

            <span className="role-badge">
              {user?.role}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-btn login-btn" to="/login">
              Login
            </Link>

            <Link className="nav-btn register-btn" to="/register">
              Register
            </Link>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;