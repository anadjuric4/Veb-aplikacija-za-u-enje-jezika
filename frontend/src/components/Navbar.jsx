import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "700" : "400",
    textDecoration: "none",
    marginRight: 12,
  });

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <NavLink to="/" style={linkStyle}>Home</NavLink>
      <NavLink to="/courses" style={linkStyle}>Courses</NavLink>
      <NavLink to="/login" style={linkStyle}>Login</NavLink>
      <NavLink to="/register" style={linkStyle}>Register</NavLink>
    </nav>
  );
}
