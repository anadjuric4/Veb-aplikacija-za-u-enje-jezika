import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

export default function Navbar() {
  const { isAuthed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="nav">
      <div className="nav-left">
        <Link to="/">Home</Link>

        {isAuthed && (
          <>
            <Link to="/courses">Courses</Link>
            <Link to="/progress">Progress</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/admin">Admin</Link> 
          </>
        )}
      </div>

      <div className="nav-right">
        {!isAuthed ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </div>
    </div>
  );
}
