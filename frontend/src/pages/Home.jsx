import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 16 }}>
      <h1>Home</h1>
      <Button onClick={() => navigate("/register")}>Register</Button>{" "}
      <Button onClick={() => navigate("/login")}>Login</Button>
    </div>
  );
}

