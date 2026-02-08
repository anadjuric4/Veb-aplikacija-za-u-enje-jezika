import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthed, user, logout } = useAuth();

  return (
    <nav style={{
      background: "#111",
      color: "#fff",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: 20, fontWeight: "bold" }}>
        Language Learning
      </Link>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>

        {isAuthed ? (
          <>
            <Link to="/courses" style={{ color: "#fff", textDecoration: "none" }}>
              Courses
            </Link>
            <Link to="/progress" style={{ color: "#fff", textDecoration: "none" }}>
              Progress
            </Link>
            <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>
              Profile
            </Link>
            
            {user?.is_admin && (
              <Link to="/admin" style={{ color: "#ffd700", textDecoration: "none" }}>
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              style={{
                background: "#d32f2f",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}