import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthed } = useAuth();

  return (
    <div className="container">
      <h1>Learn Languages Online</h1>
      <p>
        Improve your language skills through interactive courses, practical lessons,
        and short exercises designed to help you learn step by step.
      </p>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>How it works</h3>
        <ol>
          <li>Create an account or log in</li>
          <li>Choose a language and level</li>
          <li>Complete lessons and solve exercises</li>
          <li>Track your progress and results</li>
        </ol>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
          {!isAuthed ? (
            <>
              <Button onClick={() => navigate("/register")}>Get started</Button>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/courses")}>My courses</Button>
              <Link to="/progress">My progress</Link>
              <Link to="/profile">My profile</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
