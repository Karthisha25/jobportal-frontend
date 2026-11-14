
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const favorites = useSelector((state) => state.favorites);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "white",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "35px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/" style={linkStyle}>Home</Link>

        <Link to="/jobs" style={linkStyle}>Jobs</Link>

        <Link to="/favorites" style={linkStyle}>
          Favorites ({favorites.length})
        </Link>

        {user ? (
          <>
            <span style={{ fontSize: "18px", color: "#344563" }}>
              Welcome, {user.name}
            </span>

            <Link to="/logout" style={linkStyle}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/register" style={linkStyle}>Register</Link>
            <Link to="/login" style={linkStyle}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#344563",
  fontSize: "20px",
  fontWeight: "600",
};

export default Navbar;
